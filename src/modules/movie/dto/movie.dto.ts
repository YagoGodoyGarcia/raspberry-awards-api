import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export default class MovieDto {

  @ApiProperty({ example: 1237 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'The Matrix' })
  @IsString()
  title: string;

  @ApiProperty({ example: 1999 })
  @IsNumber()
  year: number;

  @ApiProperty({ example: 'Warner Bros.' })
  @IsString()
  studios: string;

  @ApiProperty({ example: 'Wachowski Sisters' })
  @IsString()
  producers: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  winner: boolean;
}