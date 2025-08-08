import { Injectable } from "@nestjs/common";
import { TodoRepositoryProtocol } from "src/infra/todos/repositories/todo.repository.protocol";
import { GetTodosServiceProtocol } from "./protocols/get-todos-service-protocol";
import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";

@Injectable()
export class GetTodosService implements GetTodosServiceProtocol {
  constructor(private readonly todoRepository: TodoRepositoryProtocol) {}

  async findAll(): Promise<FindTodoResponseViewModel[]> {
    try {
      const todos = await this.todoRepository.findAll();
      return todos;
    } catch (error) {
      throw error;
    }
  }
}
