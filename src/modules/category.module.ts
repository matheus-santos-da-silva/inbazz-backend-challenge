import { Module } from "@nestjs/common";
import { PrismaModule } from "src/infra/database/config/prisma.module";
import { CategoryRepository } from "src/infra/categories/repositories/category.repository";
import { CategoryController } from "src/presentation/categories/category.controller";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import {
  CreateCategoryService,
  GetCategoriesService,
  FindCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
} from "src/application/categories/use-cases/";

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [
    CreateCategoryService,
    GetCategoriesService,
    FindCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    {
      provide: CategoryRepositoryProtocol,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}
