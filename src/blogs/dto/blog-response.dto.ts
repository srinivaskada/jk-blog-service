import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";
import { BlogId, UserId } from "src/types/common.type";

export class BlogResponseDto {
  @ApiProperty()
  id: BlogId
  
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdBy: UserId

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