import { Category } from "src/domain/categories/category.entity";
import { PrismaService } from "src/infra/database/config/prisma.service";
import { CreateCategoryDTO } from "src/presentation/categories/dtos/create-category.dto";
import { CategoryRepositoryProtocol } from "./category.repository.protocol";
import { InternalServerErrorException, Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository implements CategoryRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    try {
      const category = await this.prisma.category.create({ data });
      return category;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao criar a categoria!"
      );
    }
  }

  async findById(id: string): Promise<Category> {
    try {
      const category = await this.prisma.category.findUnique({ where: { id } });
      return category;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao encontrar a categoria!"
      );
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao trazer as categorias!"
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao deletar a categoria!"
      );
    }
  }
}
