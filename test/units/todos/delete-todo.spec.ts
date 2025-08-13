import { DeleteTodoService } from "../../../src/application/todos/use-cases";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTodoInputMock } from "../../mocks/todos/create-todo-input.mock";
import { UpdateTodoInputMock } from "../../mocks/todos/update-todo-input.mock";
import { TodoRepositoryProtocol } from "../../../src/infra/todos/repositories/todo.repository.protocol";
import { TodoInMemoryRepository } from "../../mocks/in-memory-repositories/todo-in-memory-repository";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../mocks/in-memory-repositories/category-in-memory-repository";

describe("Delete Todo Service", () => {
  let service: DeleteTodoService;
  let todoRepository: TodoRepositoryProtocol;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTodoService,
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

    service = module.get<DeleteTodoService>(DeleteTodoService);
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

  it("should delete todo", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    const todo = await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category.id,
    });

    await service.delete(todo.id);
    await expect(todoRepository.findAll()).resolves.toEqual([]);
  });

  it("should throw an exception when todo not exists", async () => {
    const result = service.delete("invalid-id");
    expect(result).rejects.toThrow("Tarefa não existe!");
  });
});
