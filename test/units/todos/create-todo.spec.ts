import { CreateTodoService } from "../../../src/application/todos/use-cases";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTodoInputMock } from "../../../test/mocks/todos/create-todo-input.mock";
import { TodoRepositoryProtocol } from "../../../src/infra/todos/repositories/todo.repository.protocol";
import { TodoInMemoryRepository } from "../../../test/mocks/in-memory-repositories/todo-in-memory-repository";
import { CreateCategoryInputMock } from "../../../test/mocks/categories/create-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../../test/mocks/in-memory-repositories/category-in-memory-repository";

describe("Create Todo Service", () => {
  let service: CreateTodoService;
  let todoRepository: TodoRepositoryProtocol;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTodoService,
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

    service = module.get<CreateTodoService>(CreateTodoService);
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

  it("should create a todo", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    const todo = {
      ...CreateTodoInputMock,
      categoryId: category.id,
    };

    const result = service.create(todo);
    expect(result).resolves.toMatchObject(todo);
  });

  it("should throw an exception when category not exists", async () => {
    const todo = {
      ...CreateTodoInputMock,
      categoryId: "invalid-category-id",
    };

    const result = service.create(todo);
    expect(result).rejects.toThrow("Categoria não existe!");
  });
});
