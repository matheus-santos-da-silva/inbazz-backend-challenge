import { TodoInputDTO } from "./dtos/todo-input.dto";
import { plainToInstance } from "class-transformer";
import { TodoResponseViewModel } from "./view-model/todo-vm";
import { FindTodoResponseViewModel } from "./view-model/find-todo-vm";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpBadRequestError, HttpNotFoundError } from "../swagger/http-errors";
import {
  CreateTodoService,
  GetTodosService,
  FindTodoService,
  UpdateTodoService,
  DeleteTodoService,
} from "src/application/todos/use-cases/";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";

@ApiTags("TODOS")
@Controller("todos")
export class TodoController {
  constructor(
    private readonly createTodo: CreateTodoService,
    private readonly getTodos: GetTodosService,
    private readonly findTodo: FindTodoService,
    private readonly updateTodo: UpdateTodoService,
    private readonly deleteTodo: DeleteTodoService
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
  async getAllTodos(): Promise<FindTodoResponseViewModel[]> {
    try {
      const todos = await this.getTodos.findAll();
      return todos;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: "Get a Todo" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: FindTodoResponseViewModel,
  })
  @ApiResponse(HttpNotFoundError)
  @Get(":id")
  async getTodo(@Param("id") id: string): Promise<FindTodoResponseViewModel> {
    try {
      const todo = await this.findTodo.findById(id);
      return todo;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: "Update Todo" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: TodoResponseViewModel,
  })
  @ApiResponse(HttpNotFoundError)
  @ApiResponse(HttpBadRequestError)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: TodoInputDTO
  ): Promise<TodoResponseViewModel> {
    try {
      const updatedTodo = await this.updateTodo.update(id, data);
      return plainToInstance(TodoResponseViewModel, updatedTodo);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: "Delete Todo" })
  @ApiResponse({
    status: 204,
    description: "Success",
  })
  @ApiResponse(HttpNotFoundError)
  @HttpCode(204)
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.deleteTodo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
