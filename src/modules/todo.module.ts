import { Module } from "@nestjs/common";
import { PrismaModule } from "src/infra/database/config/prisma.module";
import { TodoController } from "src/presentation/todos/todo.controller";
import { TodoRepository } from "src/infra/todos/repositories/todo.repository";
import { CreateTodoService } from "src/application/todos/use-cases";
import { CategoryRepository } from "src/infra/categories/repositories/category.repository";
import { TodoRepositoryProtocol } from "src/infra/todos/repositories/todo.repository.protocol";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";

@Module({
  imports: [PrismaModule],
  controllers: [TodoController],
  providers: [
    CreateTodoService,
    {
      provide: TodoRepositoryProtocol,
      useClass: TodoRepository,
    },
    {
      provide: CategoryRepositoryProtocol,
      useClass: CategoryRepository,
    },
  ],
})
export class TodoModule {}
