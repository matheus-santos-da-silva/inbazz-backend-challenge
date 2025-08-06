import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponseViewModel {
  @ApiProperty({ example: "8a18f940-47cc-4174-a32e-1398e290b6f8" })
  id: string;

  @ApiProperty({ example: "Trabalho" })
  name: string;

  @ApiProperty({ example: "Categoria para as tarefas do meu trabalho" })
  description: string;
}
