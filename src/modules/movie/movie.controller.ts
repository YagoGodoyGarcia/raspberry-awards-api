import { Controller, Get } from "@nestjs/common";
import { MovieService } from "./movie.service";

@Controller('movies')
export class MovieController{
    constructor(private readonly movieService: MovieService) {}

    @Get('/All')
    public async findAll(){
        return this.movieService.findAll()
    }

    @Get('/PrizeInterval')
    async prizeInterval() {
        return this.movieService.longestPrizeInterval()
    }
}