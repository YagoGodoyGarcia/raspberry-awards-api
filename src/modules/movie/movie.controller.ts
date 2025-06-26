import { Controller, Get } from "@nestjs/common";
import { MovieService } from "./movie.service";

@Controller('movies')
export class MovieController{
    constructor(private readonly movieService: MovieService) {

    }

    @Get('/All')
    async findAll(){
        return this.movieService.moviesAll()
    }

    @Get('/PrizeInterval')
    async prizeInterval() {
        return this.movieService.longestPrizeInterval()
    }
}