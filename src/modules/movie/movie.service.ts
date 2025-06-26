import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { loadMoviesFromCsv } from "./utils/csv-loader";
import { Movie } from "./interfaces/movie.dto";


@Injectable()
export class MovieService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        const movies: Movie[] = await loadMoviesFromCsv();
        console.log("Quantidade de filmes no arquivo:", movies.length)

        let contadorMovies = 0

        for (const movie of movies) {
            const consultMovie = await this.prisma.movie.findFirst({
                where: {
                    title: movie.title,
                    year: movie.year,
                    producers: movie.producers,
                },
            })
        
            if (!consultMovie) {
                await this.prisma.movie.create({
                    data: {
                        title: movie.title,
                        year: movie.year,
                        studios: movie.studios,
                        producers: movie.producers,
                        winner: movie.winner
                    }
                })
                contadorMovies++
            }
        }
        if (contadorMovies == 0) {
            console.log("Nem um filme novo foi encontrado, todos os filmes desse arquivo já estão cadastrados")
        } else {
            console.log(`Importação finalizada, ${contadorMovies} foram inseridos na base!`)
        }
    }
}