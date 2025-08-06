import { Module } from "@nestjs/common";
import { PrismaModule } from "src/infra/database/config/prisma.module";
import { CategoryRepository } from "src/infra/categories/repositories/category.repository";
import { CategoryController } from "src/presentation/categories/category.controller";
import { CreateCategoryService } from "src/application/categories/use-cases/";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [
    CreateCategoryService,
    {
      provide: CategoryRepositoryProtocol,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}
