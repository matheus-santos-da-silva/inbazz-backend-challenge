import { Test, TestingModule } from "@nestjs/testing";
import { FindCategoryService } from "src/application/categories/use-cases";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../mocks/in-memory-repositories/category-in-memory-repository";

describe("Find Category Service", () => {
  let service: FindCategoryService;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCategoryService,
        {
          provide: CategoryRepositoryProtocol,
          useClass: CategoryInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<FindCategoryService>(FindCategoryService);
    categoriesRepository = module.get<CategoryRepositoryProtocol>(
      CategoryRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(categoriesRepository).toBeDefined();
  });

  it("should return a category", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    const result = await service.findById(category.id);

    expect(result.id).toEqual(category.id);
    expect(result.name).toEqual(category.name);
  });

  it("should throw an exception when category not exists", () => {
    const result = service.findById("invalid-id");
    expect(result).rejects.toThrow("Categoria não existe!");
  });
});
