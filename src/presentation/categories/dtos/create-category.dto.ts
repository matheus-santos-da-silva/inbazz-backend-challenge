import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDTO {
  @ApiProperty({ example: "Trabalho" })
  @IsNotEmpty({ message: "O nome da categoria é obrigatório!" })
  @IsString({ message: "O nome deve ser uma string!" })
  name: string;

  @ApiProperty({ example: "Categoria para as tarefas do meu trabalho" })
  @IsNotEmpty({ message: "A descrição da categoria é obrigatória!" })
  @IsString({ message: "A descrição deve ser uma string!" })
  description: string;
}
