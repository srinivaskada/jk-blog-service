import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class BlogRequestDto {
  @ApiProperty({
    required: true,
    nullable: false
  })
  @IsString()
  @MinLength(5)
  title: string;

  @ApiProperty({
    required: true,
    nullable: false
  })
  @IsString()
  description: string;
}