import { JwtService } from "@nestjs/jwt";
import { Controller, Get } from "@nestjs/common";
import { TokenResponseViewModel } from "./view-models/token-vm";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Authenticate")
@Controller("auth")
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @ApiOperation({ summary: "Get JWT Token" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: TokenResponseViewModel,
  })
  @Get()
  async get(): Promise<TokenResponseViewModel> {
    try {
      const payload = { name: "inbazz" };
      const token = this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      throw error;
    }
  }
}
