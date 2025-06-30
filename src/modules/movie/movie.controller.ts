import { Controller, Get } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { ApiAcceptedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import MovieDto from "./dto/movie.dto";
import { PrizeIntervalResponseDto } from "./dto/prize-interval-response.dto";

@ApiTags('movies')
@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get('/all')
    @ApiOperation({ summary: 'Retorna todos os filmes' })
    @ApiResponse({ status: 200, type: MovieDto, isArray: true })
    public async findAll() {
        return this.movieService.findAll()
    }

    @Get('/prizeInterval')
    @ApiOperation({ summary: 'Produtores com maior e menor intervalo entre prêmios' })
    @ApiResponse({
        status: 200,
        description: 'Intervalo mínimo e máximo entre prêmios por produtor',
        type: PrizeIntervalResponseDto,
    })
    async prizeInterval() {
        return this.movieService.longestPrizeInterval()
    }
}