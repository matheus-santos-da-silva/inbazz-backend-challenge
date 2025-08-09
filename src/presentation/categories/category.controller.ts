import { AuthGuard } from "src/application/auth/guards/auth.guard";
import { CategoryInputDTO } from "./dtos/category-input.dto";
import { CategoryResponseViewModel } from "./view-models/category-vm";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  HttpBadRequestError,
  HttpNotFoundError,
  HttpUnauthorizedError,
} from "../swagger/http-errors";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
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
  @ApiBearerAuth("access-token")
  @ApiResponse({
    status: 201,
    description: "Created",
    type: CategoryResponseViewModel,
  })
  @ApiResponse(HttpBadRequestError)
  @ApiResponse(HttpUnauthorizedError)
  @UseGuards(AuthGuard)
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
  @ApiBearerAuth("access-token")
  @ApiResponse({
    status: 200,
    description: "Success",
    type: CategoryResponseViewModel,
  })
  @ApiResponse(HttpBadRequestError)
  @ApiResponse(HttpNotFoundError)
  @ApiResponse(HttpUnauthorizedError)
  @UseGuards(AuthGuard)
  @Put(":id")
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
  @ApiBearerAuth("access-token")
  @ApiResponse({
    status: 204,
    description: "Success",
  })
  @ApiResponse(HttpNotFoundError)
  @ApiResponse(HttpUnauthorizedError)
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.deleteCategory.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
