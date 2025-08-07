import { Category } from "src/domain/categories/category.entity";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import { FindCategoryServiceProtocol } from "./protocols/find-category-service-protocol";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class FindCategoryService implements FindCategoryServiceProtocol {
  constructor(
    private readonly categoryRepository: CategoryRepositoryProtocol
  ) {}

  async findById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) throw new NotFoundException("Categoria não existe!");

      return category;
    } catch (error) {
      throw error;
    }
  }
}
