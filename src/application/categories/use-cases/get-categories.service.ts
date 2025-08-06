import { Category } from "src/domain/categories/category.entity";
import { Injectable } from "@nestjs/common";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import { GetCategoriesServiceProtocol } from "./protocols/get-categories-service-procotol";

@Injectable()
export class GetCategoriesService implements GetCategoriesServiceProtocol {
  constructor(
    private readonly categoryRepository: CategoryRepositoryProtocol
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}
