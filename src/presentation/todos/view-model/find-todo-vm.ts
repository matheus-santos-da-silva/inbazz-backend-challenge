import { Status } from "@prisma/client";
import { Category } from "src/domain/categories/category.entity";
import { ApiProperty } from "@nestjs/swagger";

export class FindTodoResponseViewModel {
  @ApiProperty({ example: "999cc992-e792-4e1d-8f12-0fb51f06cfe2" })
  id: string;

  @ApiProperty({ example: "Fazer Planilha" })
  title: string;

  @ApiProperty({ example: "Terminar planilha de produtos que meu chefe pediu" })
  description: string;

  @ApiProperty({ example: Status.PENDING })
  status: Status;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({
    example: {
      id: "8a18f940-47cc-4174-a32e-1398e290b6f8",
      name: "Trabalho",
      description: "Categoria para as tarefas do meu trabalho",
    },
  })
  category: Category;
}
