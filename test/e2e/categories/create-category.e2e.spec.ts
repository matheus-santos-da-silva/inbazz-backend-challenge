import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { PrismaService } from "../../../src/infra/database/config/prisma.service";
import { getTestAuthToken } from "../../../src/utils/test-auth";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateCategoryInputMock } from "../../../test/mocks/categories/create-category-input-mock";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Create Category (e2e) - (POST /categories)", () => {
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

  it("should return status code 201 when create a category successfully", async () => {
    await request(app.getHttpServer())
      .post(`/categories`)
      .send(CreateCategoryInputMock)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
  });

  it("should return 401 status code when token is not provided", async () => {
    const { body } = await request(app.getHttpServer())
      .post("/categories")
      .expect(401);

    expect(body.message).toBe("Token não fornecido");
  });

  it("should return 400 status code when body is invalid", async () => {
    const { body } = await request(app.getHttpServer())
      .post("/categories")
      .send({ name: 1, description: "Teste Descrição" })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(body.message).toContain("O nome deve ser uma string!");
  });
});
