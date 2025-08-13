import { Test, TestingModule } from "@nestjs/testing";
import { UpdateCategoryService } from "../../../src/application/categories/use-cases";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { UpdateCategoryInputMock } from "../../mocks/categories/update-category-input-mock";
import { CategoryRepositoryProtocol } from "../../../src/infra/categories/repositories/category.repository.protocol";
import { CategoryInMemoryRepository } from "../../mocks/in-memory-repositories/category-in-memory-repository";

describe("Update Category Service", () => {
  let service: UpdateCategoryService;
  let categoriesRepository: CategoryRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCategoryService,
        {
          provide: CategoryRepositoryProtocol,
          useClass: CategoryInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateCategoryService>(UpdateCategoryService);
    categoriesRepository = module.get<CategoryRepositoryProtocol>(
      CategoryRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(categoriesRepository).toBeDefined();
  });

  it("should update category", async () => {
    const category = await categoriesRepository.create(CreateCategoryInputMock);

    const updatedCategory = await service.update(
      category.id,
      UpdateCategoryInputMock
    );

    expect(updatedCategory.name).toEqual(UpdateCategoryInputMock.name);
    expect(updatedCategory.description).toEqual(
      UpdateCategoryInputMock.description
    );
  });

  it("should throw an exception when category not exists", () => {
    const result = service.update("invalid-id", UpdateCategoryInputMock);
    expect(result).rejects.toThrow("Categoria não existe!");
  });
});
