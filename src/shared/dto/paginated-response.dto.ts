import { ApiProperty } from "@nestjs/swagger";

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
    example: 50
  })
  limit: number;

  abstract data: DType[]
}