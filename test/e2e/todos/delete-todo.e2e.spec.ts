import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../../../src/infra/database/config/prisma.service";
import { getTestAuthToken } from "../../../src/utils/test-auth";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTodoInputMock } from "../../mocks/todos/create-todo-input.mock";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Delete Todo (e2e) - (DELETE /todos/:id)", () => {
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

  it("should return status code 204 when todo is deleted successfully", async () => {
    const category = await createCategory();
    const todo = await createTodo(category.id);

    await request(app.getHttpServer())
      .delete(`/todos/${todo.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(204);
  });

  it("should return 404 status code when todo not exists", async () => {
    const result = await request(app.getHttpServer())
      .delete(`/todos/invalid-id`)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(404);

    expect(result.body.message).toBe("Tarefa não existe!");
  });

  it("should return 401 status code when token is not provided", async () => {
    const { body } = await request(app.getHttpServer())
      .delete(`/todos/${randomUUID()}`)
      .expect(401);

    expect(body.message).toBe("Token não fornecido");
  });
});
