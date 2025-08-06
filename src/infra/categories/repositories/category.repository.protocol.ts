import { Category } from "src/domain/categories/category.entity";
import { CreateCategoryDTO } from "src/presentation/categories/dtos/create-category.dto";

export abstract class CategoryRepositoryProtocol {
  abstract create(data: CreateCategoryDTO): Promise<Category>;
  abstract findAll(): Promise<Category[]>;
}
