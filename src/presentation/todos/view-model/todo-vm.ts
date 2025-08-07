import { Status } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class TodoResponseViewModel {
  @ApiProperty({ example: "999cc992-e792-4e1d-8f12-0fb51f06cfe2" })
  id: string;

  @ApiProperty({ example: "Fazer Planilha" })
  title: string;

  @ApiProperty({ example: "Terminar planilha de produtos que meu chefe pediu" })
  description: string;

  @ApiProperty({ example: Status.PENDING })
  status: Status;

  @ApiProperty({ example: "999cc992-e792-4e1d-8f12-0fb51f06cfe2" })
  categoryId: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;
}
