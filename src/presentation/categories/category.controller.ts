import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { HttpBadRequestError } from "../swagger/http-errors";
import { CategoryResponseViewModel } from "./view-models/category-vm";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  CreateCategoryService,
  GetCategoriesService,
} from "src/application/categories/use-cases/";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(
    private readonly createCategory: CreateCategoryService,
    private readonly getCategories: GetCategoriesService
  ) {}

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

  @ApiOperation({ summary: "Get All Categories" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: CategoryResponseViewModel,
    isArray: true,
  })
  @Get()
  async getAllCategories(): Promise<CategoryResponseViewModel[]> {
    try {
      const categories = await this.getCategories.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}
