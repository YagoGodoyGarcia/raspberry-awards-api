import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../movie.service';
import { Movie } from '../interfaces/movie.dto';

describe('MovieService', () => {
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

  const mockPrisma = {
    movie: {
      findMany: jest.fn(),
      createMany: jest.fn()
    }
  }

  const mockMoviesCsv = jest.fn()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(({
      providers: [
        MovieService,
        {
          provide: "PrismaService",
          useValue: mockPrisma,
        }
      ],
    })).overrideProvider(MovieService)
      .useValue({
        ...new MovieService(mockPrisma as any),
        loadMoviesFromCsv: mockMoviesCsv,
      })
      .compile();

    movieService = module.get<MovieService>(MovieService);
  })
});
