import { Category } from "src/domain/categories/category.entity";

export abstract class CreateCategoryServiceProtocol {
  abstract create(data: Category): Promise<Category>;
}
