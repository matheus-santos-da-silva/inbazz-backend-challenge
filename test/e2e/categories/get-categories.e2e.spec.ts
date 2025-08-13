import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { PrismaService } from "../../../src/infra/database/config/prisma.service";
import { getTestAuthToken } from "../../../src/utils/test-auth";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateCategoryInputMock } from "../../mocks/categories/create-category-input-mock";

describe("Get All Categories (e2e) - (GET /categories)", () => {
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

  it("should return status code 200 when get all will successfully", async () => {
    await request(app.getHttpServer())
      .post(`/categories`)
      .send(CreateCategoryInputMock)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);

    const { body } = await request(app.getHttpServer())
      .get(`/categories`)
      .expect(200);

    expect(body).toHaveLength(1);
  });
});
