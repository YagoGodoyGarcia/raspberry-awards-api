import { ApiProperty } from '@nestjs/swagger';

export class PrizeIntervalItemDto {
  @ApiProperty({ example: 'Joel Silver' })
  producer: string;

  @ApiProperty({ example: 1 })
  interval: number;

  @ApiProperty({ example: 1990 })
  previousWin: number;

  @ApiProperty({ example: 1991 })
  followingWin: number;
}
