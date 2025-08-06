import { Category } from "src/domain/categories/category.entity";

export abstract class FindCategoryServiceProtocol {
  abstract findById(id: string): Promise<Category>;
}
