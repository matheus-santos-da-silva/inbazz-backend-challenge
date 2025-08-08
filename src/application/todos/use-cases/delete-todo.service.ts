import { TodoRepositoryProtocol } from "src/infra/todos/repositories/todo.repository.protocol";
import { DeleteTodoServiceProtocol } from "./protocols/delete-todo-service-protocol";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteTodoService implements DeleteTodoServiceProtocol {
  constructor(private readonly todoRepository: TodoRepositoryProtocol) {}

  async delete(id: string): Promise<void> {
    try {
      const todo = await this.todoRepository.findById(id);
      if (!todo) throw new NotFoundException("Tarefa não existe!");

      await this.todoRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
