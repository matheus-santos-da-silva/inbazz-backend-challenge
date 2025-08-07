import { Todo } from "src/domain/todos/todo.entity";
import { TodoInputDTO } from "src/presentation/todos/dtos/todo-input.dto";
import { TodoRepositoryProtocol } from "src/infra/todos/repositories/todo.repository.protocol";
import { CreateTodoServiceProtocol } from "./protocols/create-todo-service-protocol";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CreateTodoService implements CreateTodoServiceProtocol {
  constructor(
    private readonly todoRepository: TodoRepositoryProtocol,
    private readonly categoryRepository: CategoryRepositoryProtocol
  ) {}

  async create(data: TodoInputDTO): Promise<Todo> {
    try {
      const category = await this.categoryRepository.findById(data.categoryId);
      if (!category) throw new NotFoundException("Categoria não existe!");

      const todo = await this.todoRepository.create(data);
      return todo;
    } catch (error) {
      throw error;
    }
  }
}
