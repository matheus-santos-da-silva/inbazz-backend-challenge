import { Todo } from "src/domain/todos/todo.entity";
import { Status } from "@prisma/client";
import { TodoInputDTO } from "src/presentation/todos/dtos/todo-input.dto";
import { TodoRepositoryProtocol } from "src/infra/todos/repositories/todo.repository.protocol";
import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";

export class TodoInMemoryRepository implements TodoRepositoryProtocol {
  todos: Todo[] = [];

  async create(data: TodoInputDTO): Promise<Todo> {
    const id = "test-todo-id";
    const todo = { ...data, id, createdAt: new Date() };

    this.todos.push(todo);
    return todo;
  }

  async findAll(
    categoryId?: string,
    status?: Status
  ): Promise<FindTodoResponseViewModel[]> {
    let filteredTodos = this.todos;

    if (categoryId) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.categoryId === categoryId
      );
    }

    if (status) {
      filteredTodos = filteredTodos.filter((todo) => todo.status === status);
    }

    return filteredTodos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
      createdAt: todo.createdAt,
      category: {
        id: todo.categoryId,
        name: "test-category-name",
        description: "test-category-description",
      },
    }));
  }

  async findById(id: string): Promise<FindTodoResponseViewModel> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      return {
        ...todo,
        category: {
          id: todo?.categoryId,
          name: "test-category-name",
          description: "test-category-description",
        },
      };
    }
  }

  async update(id: string, data: TodoInputDTO): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
      const currentTodo = this.todos[todoIndex];
      const updatedTodo = {
        id: currentTodo.id,
        ...data,
        createdAt: currentTodo.createdAt,
      };

      this.todos[todoIndex] = updatedTodo;
      return updatedTodo;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) this.todos.splice(index, 1);
  }
}
