import { Category } from "src/domain/categories/category.entity";
import { CategoryInputDTO } from "src/presentation/categories/dtos/category-input.dto";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import { CreateCategoryServiceProtocol } from "./protocols/create-category-service-protocol";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateCategoryService implements CreateCategoryServiceProtocol {
  constructor(
    private readonly categoryRepository: CategoryRepositoryProtocol
  ) {}

  async create(data: CategoryInputDTO): Promise<Category> {
    try {
      const category = await this.categoryRepository.create(data);
      if (!category) {
        throw new BadRequestException("Erro inesperado ao criar categoria!");
      }

      return category;
    } catch (error) {
      throw error;
    }
  }
}
