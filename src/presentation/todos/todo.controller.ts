import { AuthGuard } from "src/application/auth/guards/auth.guard";
import { TodoInputDTO } from "./dtos/todo-input.dto";
import { plainToInstance } from "class-transformer";
import { FindTodosQueryDto } from "./dtos/find-todos-query.dto";
import { TodoResponseViewModel } from "./view-model/todo-vm";
import { FindTodoResponseViewModel } from "./view-model/find-todo-vm";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  HttpBadRequestError,
  HttpNotFoundError,
  HttpUnauthorizedError,
} from "../swagger/http-errors";
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
  UseGuards,
  UseInterceptors,
  Query,
  ValidationPipe,
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
  @ApiBearerAuth("access-token")
  @ApiResponse({
    status: 201,
    description: "Created",
    type: TodoResponseViewModel,
  })
  @ApiResponse(HttpBadRequestError)
  @ApiResponse(HttpNotFoundError)
  @ApiResponse(HttpUnauthorizedError)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
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
  @ApiResponse(HttpNotFoundError)
  @ApiQuery({
    name: "categoryId",
    required: false,
    type: String,
    description: "Id da Categoria da tarefa para filtrar",
  })
  @ApiQuery({
    name: "status",
    required: false,
    type: String,
    description: "Status da tarefa para filtrar (ex: PENDING, COMPLETED)",
  })
  @Get()
  async getAllTodos(
    @Query(new ValidationPipe({ transform: true })) query: FindTodosQueryDto
  ): Promise<FindTodoResponseViewModel[]> {
    try {
      const todos = await this.getTodos.findAll(query.categoryId, query.status);
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
  @ApiBearerAuth("access-token")
  @ApiResponse({
    status: 200,
    description: "Success",
    type: TodoResponseViewModel,
  })
  @ApiResponse(HttpNotFoundError)
  @ApiResponse(HttpBadRequestError)
  @ApiResponse(HttpUnauthorizedError)
  @UseGuards(AuthGuard)
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
  @ApiBearerAuth("access-token")
  @ApiResponse({
    status: 204,
    description: "Success",
  })
  @ApiResponse(HttpNotFoundError)
  @ApiResponse(HttpUnauthorizedError)
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.deleteTodo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
