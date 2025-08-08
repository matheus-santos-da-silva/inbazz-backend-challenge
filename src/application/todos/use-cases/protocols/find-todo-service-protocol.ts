import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";

export abstract class FindTodoServiceProtocol {
  abstract findById(id: string): Promise<FindTodoResponseViewModel>;
}
