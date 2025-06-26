import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { PrismaService } from "src/database/prisma.service";



@Module({
    providers: [MovieService, PrismaService]
})
export class MovieModules{

}