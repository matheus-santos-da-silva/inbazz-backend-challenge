import { Test, TestingModule } from "@nestjs/testing";
import { GetCategoriesService } from "../../../src/application/categories/use-cases";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../mocks/in-memory-repositories/category-in-memory-repository";

describe("Get Categories Service", () => {
  let service: GetCategoriesService;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCategoriesService,
        {
          provide: CategoryRepositoryProtocol,
          useClass: CategoryInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<GetCategoriesService>(GetCategoriesService);
    categoriesRepository = module.get<CategoryRepositoryProtocol>(
      CategoryRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(categoriesRepository).toBeDefined();
  });

  it("should return all categories", async () => {
    await categoriesRepository.create(CreateCategoryInputMock);
    await categoriesRepository.create(CreateCategoryInputMock);
    await categoriesRepository.create(CreateCategoryInputMock);

    const result = service.findAll();

    expect(result).resolves.toHaveLength(3);
  });
});
