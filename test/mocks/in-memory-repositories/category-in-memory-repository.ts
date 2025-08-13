import { Category } from "src/domain/categories/category.entity";
import { CategoryInputDTO } from "src/presentation/categories/dtos/category-input.dto";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";

export class CategoryInMemoryRepository implements CategoryRepositoryProtocol {
  categories: Category[] = [];

  async create(data: CategoryInputDTO): Promise<Category> {
    const id = "test-category-id";
    const category = { ...data, id };

    this.categories.push(category);
    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findById(id: string): Promise<Category> {
    return this.categories.find((category) => category.id === id);
  }

  async update(id: string, data: CategoryInputDTO): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );

    const currentCategory = this.categories[categoryIndex];
    const updatedCategory = { id: currentCategory.id, ...data };

    this.categories[categoryIndex] = updatedCategory;
    return updatedCategory;
  }

  async delete(id: string): Promise<void> {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index !== -1) this.categories.splice(index, 1);
  }
}
