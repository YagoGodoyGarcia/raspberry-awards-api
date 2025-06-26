import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModules } from './modules/movie/movie.module';

@Module({
  imports: [MovieModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
