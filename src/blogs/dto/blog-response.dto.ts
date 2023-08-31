import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class BlogResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    format: 'date-time'
  })
  @IsDateString({
    strict: true
  })
  updatedAt: string

  @ApiProperty({
    format: 'date-time'
  })
  @IsDateString({
    strict: true
  })
  createdAt: string
}