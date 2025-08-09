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
    example: "Recurso não encontrado",
  })
  message: string;

  @ApiProperty({
    example: "Not Found",
  })
  error: string;
}

export class UnauthorizedResponseExample {
  @ApiProperty({
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    example: "Não autorizado!",
  })
  message: string;

  @ApiProperty({
    example: "Unauthorized",
  })
  error: string;
}
