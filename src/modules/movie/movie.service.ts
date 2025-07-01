import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { loadMoviesFromCsv } from "./utils/csv-loader";
import { ImportResultDTO, Movie } from "./interfaces/movie.dto";
import MovieDto from "./dto/movie.dto";
import { title } from "process";


@Injectable()
export class MovieService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit(): Promise<ImportResultDTO> {
        try {

            const movies: Movie[] = await this.loadMoviesFromCsv();
            const totalLidos = movies.length;

            this.validateMovies(movies);

            const newMovies = await this.filterNewMovies(movies)
            const inseridos = newMovies.length;

            if (newMovies.length > 0) {
                await this.prisma.movie.createMany({
                    data: newMovies.map((movie) => ({
                        title: movie.title,
                        year: movie.year,
                        studios: movie.studios,
                        producers: movie.producers,
                        winner: movie.winner,
                    })),
                    //skipDuplicates: true as never, // evita duplicacao de dados caso o banco de dados usado suportar
                })
            }

            const mensagem = this.generateImportMessage(inseridos)
            console.log(mensagem)

            return {
                totalLidos,
                inseridos,
                mensagem,
            };
        } catch (error) {
            console.error('Erro ao importar filmes:', error);
            throw new Error(`Falha na importação de filmes: ${error.message}`);
        }
    }

    //validar dados de entrada
    private validateMovies(movies: Movie[]): void {
        movies.map((movie, index) => {
            if(!movie.title || !movie.year){
                throw new Error(`Filme inválido na linha ${index + 1}: título ou ano ausente.`)
            }
        })
    }    

    private async loadMoviesFromCsv(): Promise<Movie[]> {
        return loadMoviesFromCsv();
    }

    private async filterNewMovies(movies: Movie[]): Promise<Movie[]> {

        //Consulta filmes existentes buscando por titulo e ano
        const existingMovies = await this.prisma.movie.findMany({
            select: {
                title: true,
                year: true,
            }
        })

        //criar id unico para cada filme existente
        const existingKey = new Set(
            existingMovies.map((movie) => `${movie.title}|${movie.year}`)
        )

        //Filtrar e retornar novos filmes nao cadastrados 
        const newMovies = movies.filter(
            (movie) => !existingKey.has(`${movie.title}|${movie.year}`)
        )
        return newMovies
    }

    private generateImportMessage(inseridos: number): string {
        return inseridos === 0
            ? 'Nenhum filme novo foi encontrado, todos já estavam cadastrados.'
            : `Importação finalizada. ${inseridos} filmes foram inseridos.`;
    }
    public async findAll(): Promise<MovieDto[]> {
        return await this.prisma.movie.findMany()
    }

    async longestPrizeInterval(): Promise<any> {

        const winners = await this.prisma.movie.findMany({
            where: {
                winner: true,
            }
        })

        // array contendo array de anos vencidos por produtor 
        const producersWinner: Record<string, number[]> = {}


        for (const movie of winners) {
            //removendo quebra de linha e and
            const producers = movie.producers.split(/,| and /).map(p => p.trim())
            for (const producer of producers) {
                if (!producersWinner[producer]) {
                    producersWinner[producer] = []
                }

                producersWinner[producer].push(movie.year)
            }

        }

        const filteredProducers = Object.entries(producersWinner)
            .filter(([_, years]) => years.length > 1) //filtrando produtores com mais de um premio 
            .map(([producer, years]) => ({
                producer,
                years: years.sort((a, b) => a - b) // organiza os anos
            }));


        const intervals: {
            producer: string;
            interval: number;
            previousWin: number;
            followingWin: number;
        }[] = [];

        for (const { producer, years } of filteredProducers) {
            for (let i = 1; i < years.length; i++) {
                intervals.push({
                    producer,
                    interval: years[i] - years[i - 1],
                    previousWin: years[i - 1],
                    followingWin: years[i],
                });
            }
        }

        if (intervals.length === 0) return { min: [], max: [] };

        const minInterval = Math.min(...intervals.map(i => i.interval));
        const maxInterval = Math.max(...intervals.map(i => i.interval));

        return {
            min: intervals.filter(i => i.interval === minInterval),
            max: intervals.filter(i => i.interval === maxInterval),
        };
    }
}