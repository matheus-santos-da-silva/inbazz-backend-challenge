import { GetTodosService } from "../../../src/application/todos/use-cases";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTodoInputMock } from "../../mocks/todos/create-todo-input.mock";
import { TodoRepositoryProtocol } from "../../../src/infra/todos/repositories/todo.repository.protocol";
import { TodoInMemoryRepository } from "../../mocks/in-memory-repositories/todo-in-memory-repository";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../mocks/in-memory-repositories/category-in-memory-repository";

describe("Get Todos Service", () => {
  let service: GetTodosService;
  let todoRepository: TodoRepositoryProtocol;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTodosService,
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

    service = module.get<GetTodosService>(GetTodosService);
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

  it("should return all todos without query search", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category.id,
    });

    await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category.id,
    });

    const result = service.findAll();

    expect(result).resolves.toHaveLength(2);
  });

  it("should return only todos that status is COMPLETED", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category.id,
    });

    await todoRepository.create({
      ...CreateTodoInputMock,
      status: "COMPLETED",
      categoryId: category.id,
    });

    const result = await service.findAll(undefined, "COMPLETED");
    expect(result).toHaveLength(1);
    expect(result[0].status).toEqual("COMPLETED");
  });

  it("should return only todos that categoryId is equal to search param categoryId", async () => {
    const category1 = await categoriesRepository.create(
      CreateCategoryInputMock
    );

    jest.spyOn(categoriesRepository, "create").mockResolvedValueOnce({
      ...CreateCategoryInputMock,
      id: "different-id",
    });

    const category2 = await categoriesRepository.create(
      CreateCategoryInputMock
    );

    await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category1.id,
    });

    await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category2.id,
    });

    const result = await service.findAll(category1.id, undefined);
    expect(result).toHaveLength(1);
  });

  it("should return todos that match all search parameters", async () => {
    const category1 = await categoriesRepository.create(
      CreateCategoryInputMock
    );

    jest.spyOn(categoriesRepository, "create").mockResolvedValueOnce({
      ...CreateCategoryInputMock,
      id: "different-id",
    });

    const category2 = await categoriesRepository.create(
      CreateCategoryInputMock
    );

    await todoRepository.create({
      ...CreateTodoInputMock,
      status: "COMPLETED",
      categoryId: category1.id,
    });

    await todoRepository.create({
      ...CreateTodoInputMock,
      categoryId: category2.id,
    });

    await expect(
      service.findAll(category1.id, "COMPLETED")
    ).resolves.toHaveLength(1);

    await expect(
      service.findAll(category1.id, "PENDING")
    ).resolves.toHaveLength(0);
  });

  it("should throw an exception when categoryId not exists", async () => {
    const result = service.findAll("invalid-id", undefined);
    expect(result).rejects.toThrow("Categoria não existe!");
  });
});
