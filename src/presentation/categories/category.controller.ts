import { CategoryInputDTO } from "./dtos/category-input.dto";
import { CategoryResponseViewModel } from "./view-models/category-vm";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpBadRequestError, HttpNotFoundError } from "../swagger/http-errors";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  CreateCategoryService,
  GetCategoriesService,
  FindCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
} from "src/application/categories/use-cases/";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(
    private readonly createCategory: CreateCategoryService,
    private readonly getCategories: GetCategoriesService,
    private readonly findCategory: FindCategoryService,
    private readonly updateCategory: UpdateCategoryService,
    private readonly deleteCategory: DeleteCategoryService
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
    @Body() data: CategoryInputDTO
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

  @ApiOperation({ summary: "Get Category" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: CategoryResponseViewModel,
  })
  @Get(":id")
  @ApiResponse(HttpNotFoundError)
  async getCategory(
    @Param("id") id: string
  ): Promise<CategoryResponseViewModel> {
    try {
      const category = await this.findCategory.findById(id);
      return category;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: "Update Category" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: CategoryResponseViewModel,
  })
  @Put(":id")
  @ApiResponse(HttpBadRequestError)
  @ApiResponse(HttpNotFoundError)
  async update(
    @Param("id") id: string,
    @Body() data: CategoryInputDTO
  ): Promise<CategoryResponseViewModel> {
    try {
      const updatedCategory = await this.updateCategory.update(id, data);
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: "Delete Category" })
  @ApiResponse({
    status: 204,
    description: "Success",
  })
  @Delete(":id")
  @ApiResponse(HttpNotFoundError)
  @HttpCode(204)
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.deleteCategory.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
