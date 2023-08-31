import { ApiProperty } from "@nestjs/swagger";

export class EntityCreated {
  @ApiProperty()
  id: number;
}