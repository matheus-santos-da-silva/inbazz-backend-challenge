import { Todo } from "src/domain/todos/todo.entity";
import { TodoInputDTO } from "src/presentation/todos/dtos/todo-input.dto";
import { PrismaService } from "src/infra/database/config/prisma.service";
import { TodoRepositoryProtocol } from "./todo.repository.protocol";
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
}
