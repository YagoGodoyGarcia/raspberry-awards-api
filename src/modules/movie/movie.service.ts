import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { loadMoviesFromCsv } from "./utils/csv-loader";
import { ImportResultDTO, Movie } from "./interfaces/movie.dto";
import MovieDto from "./dto/movie.dto";


@Injectable()
export class MovieService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit(): Promise<ImportResultDTO> {
        const movies: Movie[] = await loadMoviesFromCsv();
        const totalLidos = movies.length;

        let contadorMovies = 0;

        for (const movie of movies) {
            const consultMovie = await this.prisma.movie.findFirst({
                where: {
                    title: movie.title,
                    year: movie.year,
                    producers: movie.producers,
                },
            });

            if (!consultMovie) {
                await this.prisma.movie.create({
                    data: {
                        title: movie.title,
                        year: movie.year,
                        studios: movie.studios,
                        producers: movie.producers,
                        winner: movie.winner,
                    },
                });
                contadorMovies++;
            }
        }

        const mensagem =
            contadorMovies === 0
                ? 'Nenhum filme novo foi encontrado, todos já estavam cadastrados.'
                : `Importação finalizada. ${contadorMovies} filmes foram inseridos.`

        console.log(mensagem);

        return {
            totalLidos,
            inseridos: contadorMovies,
            mensagem,
        };
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