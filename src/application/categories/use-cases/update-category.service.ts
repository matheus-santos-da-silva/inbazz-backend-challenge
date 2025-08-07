import { Category } from "src/domain/categories/category.entity";
import { CategoryInputDTO } from "src/presentation/categories/dtos/category-input.dto";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateCategoryServiceProtocol } from "./protocols/update-category-service-protocol";

@Injectable()
export class UpdateCategoryService implements UpdateCategoryServiceProtocol {
  constructor(
    private readonly categoryRepository: CategoryRepositoryProtocol
  ) {}

  async update(id: string, data: CategoryInputDTO): Promise<Category> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) throw new NotFoundException("Categoria não existe!");

      const updatedCategory = await this.categoryRepository.update(id, data);
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }
}
