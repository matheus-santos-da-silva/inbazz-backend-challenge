import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";

export abstract class GetTodosServiceProtocol {
  abstract findAll(): Promise<FindTodoResponseViewModel[]>;
}
