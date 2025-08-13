import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../../../src/infra/database/config/prisma.service";
import { getTestAuthToken } from "../../../src/utils/test-auth";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTodoInputMock } from "../../mocks/todos/create-todo-input.mock";
import { UpdateTodoInputMock } from "../../mocks/todos/update-todo-input.mock";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Update Todo (e2e) - (PUT /todos/:id)", () => {
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

  const createCategory = async () => {
    const { body } = await request(app.getHttpServer())
      .post("/categories")
      .send({
        name: "test-category-name",
        description: "test-category-description",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
    return body;
  };

  const createTodo = async (categoryId: string) => {
    const { body } = await request(app.getHttpServer())
      .post("/todos")
      .send({ ...CreateTodoInputMock, categoryId })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
    return body;
  };

  it("should return status code 200 when update a todo successfully", async () => {
    const category = await createCategory();
    const todo = await createTodo(category.id);

    await request(app.getHttpServer())
      .put(`/todos/${todo.id}`)
      .send({ ...UpdateTodoInputMock, categoryId: category.id })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(200);
  });

  it("should return 401 status code when token is not provided", async () => {
    const { body } = await request(app.getHttpServer())
      .put(`/todos/${randomUUID()}`)
      .send({ ...UpdateTodoInputMock, categoryId: randomUUID() })
      .expect(401);

    expect(body.message).toBe("Token não fornecido");
  });

  it("should return 404 status code when todo not exists", async () => {
    const category = await createCategory();

    const result = await request(app.getHttpServer())
      .put(`/todos/invalid-id`)
      .send({ ...UpdateTodoInputMock, categoryId: category.id })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(404);

    expect(result.body.message).toBe("Tarefa não existe!");
  });

  it("should return 404 status code when category not exists", async () => {
    const category = await createCategory();
    const todo = await createTodo(category.id);

    const result = await request(app.getHttpServer())
      .put(`/todos/${todo.id}`)
      .send({ ...UpdateTodoInputMock, categoryId: randomUUID() })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(404);

    expect(result.body.message).toBe("Categoria não existe!");
  });

  it("should return 400 status code when body is invalid", async () => {
    const category = await createCategory();
    const todo = await createTodo(category.id);

    const result = await request(app.getHttpServer())
      .put(`/todos/${todo.id}`)
      .send({ ...UpdateTodoInputMock, title: 1 })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(result.body.message).toContain("O título deve ser uma string!");
  });
});
