import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/database/prisma.service';
import { MovieService } from '../movie.service';

describe('Movies prize inteval', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve retornar os produtores com maior e menor intervalo entre prêmios', async () => {
    const response = await request(app.getHttpServer()).get('/movies/prize-interval');

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    });
  });

  it('deve retornar todos os filmes via GET /movies', async () => {
    const response = await request(app.getHttpServer()).get('/movies');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deve importar os filmes do CSV automaticamente ao iniciar', async () => {
    const movies = await prisma.movie.findMany();

    expect(movies.length).toBeGreaterThan(0);
    expect(movies[0]).toHaveProperty('title');
    expect(movies[0]).toHaveProperty('year');
  });

  it('deve lançar erro se algum filme estiver sem título ou ano', async () => {
    const service = new MovieService(prisma);

    const filmesInvalidos = [
      { title: '', year: 2000, studios: 'X', producers: 'Y', winner: false },
      { title: 'OK', year: null, studios: 'X', producers: 'Y', winner: true },
    ];

    expect(() => service['validateMovies'](filmesInvalidos as any)).toThrow();
  });


});
