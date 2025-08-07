import { Category } from "src/domain/categories/category.entity";
import { CategoryInputDTO } from "src/presentation/categories/dtos/category-input.dto";

export abstract class UpdateCategoryServiceProtocol {
  abstract update(id: string, data: CategoryInputDTO): Promise<Category>;
}
