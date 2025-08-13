import { Test, TestingModule } from "@nestjs/testing";
import { CreateCategoryService } from "../../../src/application/categories/use-cases";
import { CreateCategoryInputMock } from "../../../test/mocks/categories/create-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../../test/mocks/in-memory-repositories/category-in-memory-repository";

describe("Create Category Service", () => {
  let service: CreateCategoryService;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCategoryService,
        {
          provide: CategoryRepositoryProtocol,
          useClass: CategoryInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<CreateCategoryService>(CreateCategoryService);
    categoriesRepository = module.get<CategoryRepositoryProtocol>(
      CategoryRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(categoriesRepository).toBeDefined();
  });

  it("should create a category", () => {
    const result = service.create(CreateCategoryInputMock);
    expect(result).resolves;
  });
});
