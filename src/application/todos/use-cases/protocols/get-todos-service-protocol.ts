import { Status } from "@prisma/client";
import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";

export abstract class GetTodosServiceProtocol {
  abstract findAll(
    categoryId?: string,
    status?: Status
  ): Promise<FindTodoResponseViewModel[]>;
}
