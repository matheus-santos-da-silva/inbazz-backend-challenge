import { Todo } from "src/domain/todos/todo.entity";
import { TodoInputDTO } from "src/presentation/todos/dtos/todo-input.dto";
import { TodoRepositoryProtocol } from "src/infra/todos/repositories/todo.repository.protocol";
import { UpdateTodoServiceProtocol } from "./protocols/update-todo-service-protocol";
import { CategoryRepositoryProtocol } from "src/infra/categories/repositories/category.repository.protocol";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UpdateTodoService implements UpdateTodoServiceProtocol {
  constructor(
    private readonly todoRepository: TodoRepositoryProtocol,
    private readonly categoryRepository: CategoryRepositoryProtocol
  ) {}

  async update(id: string, data: TodoInputDTO): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findById(id);
      if (!todo) throw new NotFoundException("Tarefa não existe!");

      const category = await this.categoryRepository.findById(data.categoryId);
      if (!category) throw new NotFoundException("Categoria não existe!");

      const updatedTodo = await this.todoRepository.update(id, data);
      return updatedTodo;
    } catch (error) {
      throw error;
    }
  }
}
