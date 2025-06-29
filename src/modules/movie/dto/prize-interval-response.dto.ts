import { ApiProperty } from '@nestjs/swagger';
import { PrizeIntervalItemDto } from './prize-interval-item.dto';

export class PrizeIntervalResponseDto {
  @ApiProperty({ type: [PrizeIntervalItemDto] })
  min: PrizeIntervalItemDto[];

  @ApiProperty({ type: [PrizeIntervalItemDto] })
  max: PrizeIntervalItemDto[];
}
