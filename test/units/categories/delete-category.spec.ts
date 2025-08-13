import { Test, TestingModule } from "@nestjs/testing";
import { DeleteCategoryService } from "../../../src/application/categories/use-cases";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../mocks/in-memory-repositories/category-in-memory-repository";

describe("Delete Category Service", () => {
  let service: DeleteCategoryService;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCategoryService,
        {
          provide: CategoryRepositoryProtocol,
          useClass: CategoryInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteCategoryService>(DeleteCategoryService);
    categoriesRepository = module.get<CategoryRepositoryProtocol>(
      CategoryRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(categoriesRepository).toBeDefined();
  });

  it("should delete category", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);
    const result = await service.delete(category.id);

    const allCategories = await categoriesRepository.findAll();

    expect(result).resolves;
    expect(allCategories).toEqual([]);
  });

  it("should throw an exception when category not exists", () => {
    const result = service.delete("invalid-id");
    expect(result).rejects.toThrow("Categoria não existe!");
  });
});
