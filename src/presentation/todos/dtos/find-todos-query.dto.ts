import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { Status } from "@prisma/client";

export class FindTodosQueryDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsEnum(Status, { message: "Status inválido, use PENDING ou COMPLETED" })
  status?: Status;
}
