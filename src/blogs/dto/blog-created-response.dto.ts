import { PaginatedDto } from "src/shared/dto/paginated-response.dto";
import { BlogResponseDto } from "./blog-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class BlogCreatedResponseDto {
  @ApiProperty({
    type: BlogResponseDto
  })
  data: BlogResponseDto
}