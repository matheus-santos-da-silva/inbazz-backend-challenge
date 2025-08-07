import { TodoInputDTO } from "./dtos/todo-input.dto";
import { CreateTodoService } from "src/application/todos/use-cases/";
import { TodoResponseViewModel } from "./view-model/todo-vm";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpBadRequestError, HttpNotFoundError } from "../swagger/http-errors";

@ApiTags("TODOS")
@Controller("todos")
export class TodoController {
  constructor(private readonly createTodo: CreateTodoService) {}

  @ApiOperation({ summary: "Create Todo" })
  @ApiResponse({
    status: 201,
    description: "Created",
    type: TodoResponseViewModel,
  })
  @ApiResponse(HttpBadRequestError)
  @ApiResponse(HttpNotFoundError)
  @Post()
  async create(@Body() data: TodoInputDTO): Promise<TodoResponseViewModel> {
    try {
      const todo = await this.createTodo.create(data);
      return todo;
    } catch (error) {
      throw error;
    }
  }
}
