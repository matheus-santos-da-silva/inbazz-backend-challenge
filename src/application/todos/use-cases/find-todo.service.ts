import { TodoRepositoryProtocol } from "src/infra/todos/repositories/todo.repository.protocol";
import { FindTodoServiceProtocol } from "./protocols/find-todo-service-protocol";
import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class FindTodoService implements FindTodoServiceProtocol {
  constructor(private readonly todoRepository: TodoRepositoryProtocol) {}

  async findById(id: string): Promise<FindTodoResponseViewModel> {
    try {
      const todo = await this.todoRepository.findById(id);
      if (!todo) throw new NotFoundException("Tarefa não existe!");

      return todo;
    } catch (error) {
      throw error;
    }
  }
}
