import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import { DeleteCategoryServiceProtocol } from "./protocols/delete-category-service-protocol";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteCategoryService implements DeleteCategoryServiceProtocol {
  constructor(
    private readonly categoryRepository: CategoryRepositoryProtocol
  ) {}

  async delete(id: string): Promise<void> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) throw new NotFoundException("Categoria não existe!");

      await this.categoryRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
