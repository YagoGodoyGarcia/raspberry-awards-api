import { Controller, Get, HttpCode } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import MovieDto from "./dto/movie.dto";
import { PrizeIntervalResponseDto } from "./dto/prize-interval-response.dto";

@ApiTags('movies')
@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get('/')
    @HttpCode(200)
    @ApiOperation({ summary: 'Listar todos os filmes' })
    @ApiResponse({ status: 200, description: 'Lista completa de filmes', type: MovieDto, isArray: true })
    public async findAll(): Promise<MovieDto[]> {
        return this.movieService.findAll()
    }

    @Get('prize-interval')
    @HttpCode(200)
    @ApiOperation({ summary: 'Retorna produtores com maior e menor intervalo entre prêmios' })
    @ApiResponse({
        status: 200,
        description: 'Intervalo mínimo e máximo entre vitórias por produtor',
        type: PrizeIntervalResponseDto,
    })
    async prizeInterval(): Promise<PrizeIntervalResponseDto>{
        return this.movieService.longestPrizeInterval()
    }
}