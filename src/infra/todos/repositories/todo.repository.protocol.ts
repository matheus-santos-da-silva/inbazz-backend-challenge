import { Todo } from "src/domain/todos/todo.entity";
import { TodoInputDTO } from "src/presentation/todos/dtos/todo-input.dto";

export abstract class TodoRepositoryProtocol {
  abstract create(data: TodoInputDTO): Promise<Todo>;
}
