import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { HttpBadRequestError } from "../swagger/http-errors";
import { CreateCategoryService } from "src/application/categories/use-cases/create-category.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CategoryResponseViewModel } from "./view-models/category-vm";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly createCategory: CreateCategoryService) {}

  @ApiOperation({ summary: "Create Category" })
  @ApiResponse({
    status: 201,
    description: "Created",
    type: CategoryResponseViewModel,
  })
  @ApiResponse(HttpBadRequestError)
  @Post()
  async create(
    @Body() data: CreateCategoryDTO
  ): Promise<CategoryResponseViewModel> {
    try {
      const category = await this.createCategory.create(data);
      return category;
    } catch (error) {
      throw error;
    }
  }
}
