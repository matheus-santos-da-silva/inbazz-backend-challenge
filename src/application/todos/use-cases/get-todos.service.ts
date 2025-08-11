import { Status } from "@prisma/client";
import { TodoRepositoryProtocol } from "src/infra/todos/repositories/todo.repository.protocol";
import { GetTodosServiceProtocol } from "./protocols/get-todos-service-protocol";
import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetTodosService implements GetTodosServiceProtocol {
  constructor(
    private readonly todoRepository: TodoRepositoryProtocol,
    private readonly categoryRepository: CategoryRepositoryProtocol
  ) {}

  async findAll(
    categoryId?: string,
    status?: Status
  ): Promise<FindTodoResponseViewModel[]> {
    try {
      if (categoryId) {
        const category = await this.categoryRepository.findById(categoryId);
        if (!category) throw new NotFoundException("Categoria não existe!");
      }

      const todos = await this.todoRepository.findAll(categoryId, status);
      return todos;
    } catch (error) {
      throw error;
    }
  }
}
