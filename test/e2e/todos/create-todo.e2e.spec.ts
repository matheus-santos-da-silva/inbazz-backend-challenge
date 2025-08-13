import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../../../src/infra/database/config/prisma.service";
import { getTestAuthToken } from "../../../src/utils/test-auth";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTodoInputMock } from "../../mocks/todos/create-todo-input.mock";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Create Todo (e2e) - (POST /todos)", () => {
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
    await prismaService.todo.deleteMany({});
  });

  it("should return status code 201 when create a todo successfully", async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/categories`)
      .send({
        name: "test-category-name",
        description: "test-category-description",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    await request(app.getHttpServer())
      .post("/todos")
      .send({ ...CreateTodoInputMock, categoryId: body.id })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
  });

  it("should return 401 status code when token is not provided", async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/categories`)
      .send({
        name: "test-category-name",
        description: "test-category-description",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    const result = await request(app.getHttpServer())
      .post("/todos")
      .send({ ...CreateTodoInputMock, categoryId: body.id })
      .expect(401);

    expect(result.body.message).toBe("Token não fornecido");
  });

  it("should return 404 status code when category not exists", async () => {
    const { body } = await request(app.getHttpServer())
      .post("/todos")
      .send({ ...CreateTodoInputMock, categoryId: randomUUID() })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(404);

    expect(body.message).toBe("Categoria não existe!");
  });

  it("should return 400 status code when body is invalid", async () => {
    const { body } = await request(app.getHttpServer())
      .post("/todos")
      .send({ ...CreateTodoInputMock, title: 1 })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(body.message).toContain("O título deve ser uma string!");
  });
});
