import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../movie.service';
import { MovieController } from '../movie.controller';
import { Movie } from '../interfaces/movie.dto';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  const mockMovies: Movie[] = [
    {
      title: 'Mock Movie 1',
      year: 2000,
      studios: 'Studio A',
      producers: 'Producer A',
      winner: true,
    },
    {
      title: 'Mock Movie 2',
      year: 2001,
      studios: 'Studio B',
      producers: 'Producer B',
      winner: false,
    },
  ];

  const mockMovieService = {
    findAll: jest.fn().mockResolvedValue(mockMovies),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  describe('findAll', () => {
    it('deve retornar um array de filmes mockados', async () => {
      const result = await movieController.findAll();
      expect(result).toEqual(mockMovies);
      expect(mockMovieService.findAll).toHaveBeenCalled();
    });

    it('deve importar filmes e retornar resumo da operação', async () => {
      const mockMovies = {
        totalLidos: 1,
        inseridos: 1,
        mensagem: 'Importação finalizada. 206 filmes foram inseridos.',
      };

      const mockPrisma = {
        movie: {
          findFirst: jest.fn().mockResolvedValue(null), // Simula que não existe
          create: jest.fn().mockResolvedValue({}),
        },
      };

      const service = new MovieService(mockPrisma as any);


      const resultado = await service.onModuleInit();

      expect(resultado).toEqual({
        totalLidos: 206,
        inseridos: 206,
        mensagem: 'Importação finalizada. 206 filmes foram inseridos.',
      });

      expect(mockPrisma.movie.create).toHaveBeenCalledTimes(206);
    });
  });

});
