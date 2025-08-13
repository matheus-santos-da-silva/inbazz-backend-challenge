import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { randomUUID } from "crypto";
import { PrismaService } from "../../../src/infra/database/config/prisma.service";
import { getTestAuthToken } from "../../../src/utils/test-auth";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTodoInputMock } from "../../mocks/todos/create-todo-input.mock";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Get All Todos (e2e) - (GET /todos)", () => {
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

  it("should return 200 status code when all todos are retrieved successfully", async () => {
    const category = await createCategory();
    await createTodo(category.id);

    await request(app.getHttpServer())
      .post("/todos")
      .send({
        ...CreateTodoInputMock,
        id: randomUUID(),
        categoryId: category.id,
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    const result = await request(app.getHttpServer()).get(`/todos`).expect(200);
    expect(result.body).toHaveLength(2);
  });

  it("should return 200 status code and only todos matching the provided filters", async () => {
    const categoryA = await createCategory();
    await createTodo(categoryA.id);

    const categoryB = await request(app.getHttpServer())
      .post(`/categories`)
      .send({
        name: "test-category-name",
        description: "test-category-description",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    await request(app.getHttpServer())
      .post("/todos")
      .send({
        ...CreateTodoInputMock,
        status: "COMPLETED",
        id: randomUUID(),
        categoryId: categoryB.body.id,
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    const todosWithStatusCompleted = await request(app.getHttpServer())
      .get(`/todos?status=COMPLETED`)
      .expect(200);
    expect(todosWithStatusCompleted.body).toHaveLength(1);

    const todosWithStatusPending = await request(app.getHttpServer())
      .get(`/todos?status=PENDING`)
      .expect(200);
    expect(todosWithStatusPending.body).toHaveLength(1);

    const todosInCategoryA = await request(app.getHttpServer())
      .get(`/todos?categoryId=${categoryA.id}`)
      .expect(200);
    expect(todosInCategoryA.body).toHaveLength(1);

    const noMatch = await request(app.getHttpServer())
      .get(`/todos?categoryId=${categoryA.id}&status=COMPLETED`)
      .expect(200);
    expect(noMatch.body).toHaveLength(0);
  });

  it("should return 404 status code when categoryId on search param not exists", async () => {
    const result = await request(app.getHttpServer())
      .get(`/todos?categoryId=${randomUUID()}`)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(404);

    expect(result.body.message).toBe("Categoria não existe!");
  });
});
