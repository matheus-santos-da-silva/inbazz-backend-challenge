import { Todo } from "src/domain/todos/todo.entity";
import { Status } from "@prisma/client";
import { TodoInputDTO } from "src/presentation/todos/dtos/todo-input.dto";
import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";

export abstract class TodoRepositoryProtocol {
  abstract create(data: TodoInputDTO): Promise<Todo>;
  abstract findAll(
    categoryId?: string,
    status?: Status
  ): Promise<FindTodoResponseViewModel[]>;
  abstract findById(id: string): Promise<FindTodoResponseViewModel>;
  abstract update(id: string, data: TodoInputDTO): Promise<Todo>;
  abstract delete(id: string): Promise<void>;
}
