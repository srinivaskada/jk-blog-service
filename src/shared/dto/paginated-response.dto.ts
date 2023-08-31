import { ApiProperty } from "@nestjs/swagger";
import { Max } from "class-validator";

export abstract class PaginatedDto<DType> {
  @ApiProperty({
    description: 'Total number of items',
    minimum: 0,
    example: 625,
  })
  total: number;

  @ApiProperty({
    description: 'The page number',
    minimum: 1,
    example: 5,
  })
  page: number;

  @ApiProperty({
    description: 'The number of items per page',
    minimum: 0,
    maximum: 200,
    example: 50
  })
  @Max(1000)
  limit: number;

  abstract data: DType[]
}