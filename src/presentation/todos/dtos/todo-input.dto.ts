import { Status } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class TodoInputDTO {
  @ApiProperty({ example: "Fazer Planilha" })
  @IsNotEmpty({ message: "O título da tarefa é obrigatório!" })
  @IsString({ message: "O título deve ser uma string!" })
  @Length(3, 100, { message: "O título precisa ter entre 3 a 100 caracteres!" })
  title: string;

  @ApiProperty({ example: "Terminar planilha de produtos que meu chefe pediu" })
  @IsNotEmpty({ message: "A descrição da categoria é obrigatória!" })
  @IsString({ message: "A descrição deve ser uma string!" })
  @Length(3, 255, {
    message: "A descrição precisa ter entre 3 a 100 caracteres!",
  })
  description: string;

  @ApiProperty({
    example: Status.PENDING,
    enum: Status,
  })
  @IsEnum(Status, {
    message: "Status Inválido. Os valores permitidos são PENDING ou COMPLETED",
  })
  @IsNotEmpty({ message: "O Status da tarefa é obrigatório!" })
  status: Status;

  @ApiProperty({ example: "999cc992-e792-4e1d-8f12-0fb51f06cfe2" })
  @IsUUID()
  @IsNotEmpty({ message: "O ID da categoria é obrigatório!" })
  categoryId: string;
}
