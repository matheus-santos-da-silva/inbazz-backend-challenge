import { TodoInputDTO } from "./dtos/todo-input.dto";
import { plainToInstance } from "class-transformer";
import { TodoResponseViewModel } from "./view-model/todo-vm";
import { FindTodoResponseViewModel } from "./view-model/find-todo-vm";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpBadRequestError, HttpNotFoundError } from "../swagger/http-errors";
import {
  CreateTodoService,
  GetTodosService,
} from "src/application/todos/use-cases/";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from "@nestjs/common";

@ApiTags("TODOS")
@Controller("todos")
export class TodoController {
  constructor(
    private readonly createTodo: CreateTodoService,
    private readonly getTodos: GetTodosService
  ) {}

  @ApiOperation({ summary: "Create Todo" })
  @ApiResponse({
    status: 201,
    description: "Created",
    type: TodoResponseViewModel,
  })
  @ApiResponse(HttpBadRequestError)
  @ApiResponse(HttpNotFoundError)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() data: TodoInputDTO): Promise<TodoResponseViewModel> {
    try {
      const todo = await this.createTodo.create(data);
      return plainToInstance(TodoResponseViewModel, todo);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: "Get All Todos" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: FindTodoResponseViewModel,
    isArray: true,
  })
  @Get()
  async getAll(): Promise<FindTodoResponseViewModel[]> {
    try {
      const todos = await this.getTodos.findAll();
      return todos;
    } catch (error) {
      throw error;
    }
  }
}
