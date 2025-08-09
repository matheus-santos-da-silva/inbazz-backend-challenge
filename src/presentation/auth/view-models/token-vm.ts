import { ApiProperty } from "@nestjs/swagger";

export class TokenResponseViewModel {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaW5iYXp6IiwiaWF0IjoxNzU0NzU4NzU4LCJleHAiOjE3NTQ3NjU5NTh9.r3RgH4iGjLGlxwwIrAmdWtIn1_GD4K2o4ISrEtKwnDU",
  })
  token: string;
}
