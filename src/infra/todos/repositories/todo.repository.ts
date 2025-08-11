import { Todo } from "src/domain/todos/todo.entity";
import { Status } from "@prisma/client";
import { TodoInputDTO } from "src/presentation/todos/dtos/todo-input.dto";
import { PrismaService } from "src/infra/database/config/prisma.service";
import { TodoRepositoryProtocol } from "./todo.repository.protocol";
import { FindTodoResponseViewModel } from "src/presentation/todos/view-model/find-todo-vm";
import { InternalServerErrorException, Injectable } from "@nestjs/common";

@Injectable()
export class TodoRepository implements TodoRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: TodoInputDTO): Promise<Todo> {
    try {
      const todo = await this.prisma.todo.create({ data });
      return todo;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao criar a tarefa!"
      );
    }
  }

  async findAll(
    categoryId?: string,
    status?: Status
  ): Promise<FindTodoResponseViewModel[]> {
    try {
      let where: { categoryId?: string; status?: Status } = {};

      if (status) where.status = status;
      if (categoryId) where.categoryId = categoryId;

      const todos = await this.prisma.todo.findMany({
        where,
        select: {
          id: true,
          title: true,
          status: true,
          description: true,
          createdAt: true,
          category: true,
        },
      });
      return todos;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao trazer as tarefas!"
      );
    }
  }

  async findById(id: string): Promise<FindTodoResponseViewModel> {
    try {
      const todo = await this.prisma.todo.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          status: true,
          description: true,
          createdAt: true,
          category: true,
        },
      });

      return todo;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao encontrar a tarefa!"
      );
    }
  }

  async update(id: string, data: TodoInputDTO): Promise<Todo> {
    try {
      const updatedTodo = await this.prisma.todo.update({
        where: { id },
        data,
      });

      return updatedTodo;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao atualizar a tarefa!"
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.todo.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro inesperado ao excluir a tarefa!"
      );
    }
  }
}
