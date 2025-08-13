import { UpdateTodoService } from "../../../src/application/todos/use-cases";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTodoInputMock } from "../../mocks/todos/create-todo-input.mock";
import { UpdateTodoInputMock } from "../../mocks/todos/update-todo-input.mock";
import { TodoRepositoryProtocol } from "../../../src/infra/todos/repositories/todo.repository.protocol";
import { TodoInMemoryRepository } from "../../mocks/in-memory-repositories/todo-in-memory-repository";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../mocks/in-memory-repositories/category-in-memory-repository";

describe("Update Todo Service", () => {
  let service: UpdateTodoService;
  let todoRepository: TodoRepositoryProtocol;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTodoService,
        {
          provide: TodoRepositoryProtocol,
          useClass: TodoInMemoryRepository,
        },
        {
          provide: CategoryRepositoryProtocol,
          useClass: CategoryInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateTodoService>(UpdateTodoService);
    todoRepository = module.get<TodoRepositoryProtocol>(TodoRepositoryProtocol);
    categoriesRepository = module.get<CategoryRepositoryProtocol>(
      CategoryRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(todoRepository).toBeDefined();
    expect(categoriesRepository).toBeDefined();
  });

  it("should update todo", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    const todo = await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category.id,
    });

    const result = await service.update(todo.id, {
      ...UpdateTodoInputMock,
      categoryId: category.id,
    });

    expect(result.title).toEqual(UpdateTodoInputMock.title);
    expect(result.description).toEqual(UpdateTodoInputMock.description);
  });

  it("should throw an exception when todo not exists", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    const todo = {
      ...UpdateTodoInputMock,
      categoryId: category.id,
    };

    const result = service.update("invalid-id", todo);
    expect(result).rejects.toThrow("Tarefa não existe!");
  });

  it("should throw an exception when category not exists", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    const todo = await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category.id,
    });

    const result = service.update(todo.id, {
      ...UpdateTodoInputMock,
      categoryId: "invalid-category-id",
    });

    expect(result).rejects.toThrow("Categoria não existe!");
  });
});
