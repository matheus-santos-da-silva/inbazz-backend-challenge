import { Category } from "src/domain/categories/category.entity";
import { CategoryInputDTO } from "src/presentation/categories/dtos/category-input.dto";

export abstract class CategoryRepositoryProtocol {
  abstract create(data: CategoryInputDTO): Promise<Category>;
  abstract findAll(): Promise<Category[]>;
  abstract findById(id: string): Promise<Category>;
  abstract update(id: string, data: CategoryInputDTO): Promise<Category>;
  abstract delete(id: string): Promise<void>;
}
