import { Category } from "src/domain/categories/category.entity";
import { PrismaService } from "src/infra/database/config/prisma.service";
import { CreateCategoryDTO } from "src/presentation/categories/dtos/create-category.dto";
import { CategoryRepositoryProtocol } from "./category.repository.protocol";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository implements CategoryRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    try {
      const category = await this.prisma.category.create({ data });
      return category;
    } catch (error) {
      throw new BadRequestException("Erro inesperado ao criar a categoria!");
    }
  }
}
