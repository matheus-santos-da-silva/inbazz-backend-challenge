import { Category } from "src/domain/categories/category.entity";

export abstract class GetCategoriesServiceProtocol {
  abstract findAll(): Promise<Category[]>;
}
