import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CategoryInputDTO {
  @ApiProperty({ example: "Trabalho" })
  @IsNotEmpty({ message: "O nome da categoria é obrigatório!" })
  @IsString({ message: "O nome deve ser uma string!" })
  @Length(3, 100, {
    message: "O nome da categoria precisa ter entre 3 a 100 caracteres!",
  })
  name: string;

  @ApiProperty({ example: "Categoria para as tarefas do meu trabalho" })
  @IsNotEmpty({ message: "A descrição da categoria é obrigatória!" })
  @IsString({ message: "A descrição deve ser uma string!" })
  @Length(3, 255, {
    message: "A descrição precisa ter entre 3 a 100 caracteres!",
  })
  description: string;
}
