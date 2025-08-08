import { Todo } from "src/domain/todos/todo.entity";
import { TodoInputDTO } from "src/presentation/todos/dtos/todo-input.dto";
import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";

export abstract class TodoRepositoryProtocol {
  abstract create(data: TodoInputDTO): Promise<Todo>;
  abstract findAll(): Promise<FindTodoResponseViewModel[]>;
}
