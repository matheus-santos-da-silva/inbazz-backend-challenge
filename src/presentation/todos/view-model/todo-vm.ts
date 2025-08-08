import { Status } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class TodoResponseViewModel {
  @Expose()
  @ApiProperty({ example: "999cc992-e792-4e1d-8f12-0fb51f06cfe2" })
  id: string;

  @Expose()
  @ApiProperty({ example: "Fazer Planilha" })
  title: string;

  @Expose()
  @ApiProperty({ example: "Terminar planilha de produtos que meu chefe pediu" })
  description: string;

  @Expose()
  @ApiProperty({ example: Status.PENDING })
  status: Status;

  @Expose()
  @ApiProperty({
    example: "999cc992-e792-4e1d-8f12-0fb51f06cfe2",
    format: "uuid",
  })
  categoryId: string;

  @Exclude()
  createdAt: Date;
}
