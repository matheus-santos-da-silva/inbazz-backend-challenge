import { ApiProperty } from "@nestjs/swagger";

export class BadRequestResponseExample {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    example: "Um ou mais campos da requisição estão inválidos.",
  })
  message: string;

  @ApiProperty({
    example: "Bad Request",
  })
  error: string;
}

export class NotFoundResponseExample {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: "Funcionalidade não encontrada",
  })
  message: string;

  @ApiProperty({
    example: "Not Found",
  })
  error: string;
}
