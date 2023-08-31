import { PaginatedDto } from "src/shared/dto/paginated-response.dto";
import { BlogResponseDto } from "./blog-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PaginatedBlogsResponseDto extends PaginatedDto<BlogResponseDto> {
  @ApiProperty({
    isArray: true,
    type: BlogResponseDto
  })
  data: BlogResponseDto[]
}