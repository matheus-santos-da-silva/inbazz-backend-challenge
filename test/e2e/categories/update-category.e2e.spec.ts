import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { PrismaService } from "../../../src/infra/database/config/prisma.service";
import { getTestAuthToken } from "../../../src/utils/test-auth";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";
import { UpdateCategoryInputMock } from "../../mocks/categories/update-category-input-mock";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Update Category (e2e) - (PUT /categories/:id)", () => {
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

  it("should return status code 200 when update will successfully", async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/categories`)
      .send(CreateCategoryInputMock)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    await request(app.getHttpServer())
      .put(`/categories/${body.id}`)
      .send(UpdateCategoryInputMock)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(200);
  });

  it("should return 400 status code when body is invalid", async () => {
    const result = await request(app.getHttpServer())
      .post(`/categories`)
      .send(CreateCategoryInputMock)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    const { body } = await request(app.getHttpServer())
      .put(`/categories/${result.body.id}`)
      .send({ name: 1, description: "Teste Descrição" })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(body.message).toStrictEqual(["O nome deve ser uma string!"]);
  });

  it("should return 400 status code when category not exists", async () => {
    const { body } = await request(app.getHttpServer())
      .put(`/categories/invalid-id`)
      .send(UpdateCategoryInputMock)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(404);

    expect(body.message).toBe("Categoria não existe!");
  });

  it("should return 401 status code when token is not provided", async () => {
    const result = await request(app.getHttpServer())
      .post(`/categories`)
      .send(CreateCategoryInputMock)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    const { body } = await request(app.getHttpServer())
      .put(`/categories/${result.body.id}`)
      .expect(401);

    expect(body.message).toBe("Token não fornecido");
  });
});
