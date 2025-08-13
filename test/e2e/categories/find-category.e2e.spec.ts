import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { PrismaService } from "../../../src/infra/database/config/prisma.service";
import { getTestAuthToken } from "../../../src/utils/test-auth";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Find Category (e2e) - (GET /categories/:id)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let testToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();

    testToken = getTestAuthToken();
  });

  afterEach(async () => {
    await prismaService.category.deleteMany({});
  });

  it("should return status code 200 when get the category successfully", async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/categories`)
      .send(CreateCategoryInputMock)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    await request(app.getHttpServer())
      .get(`/categories/${body.id}`)
      .expect(200);
  });

  it("should return 400 status code when category not exists", async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/categories/invalid-id`)
      .expect(404);

    expect(body.message).toBe("Categoria não existe!");
  });
});
