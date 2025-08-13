import { Status } from "@prisma/client";

export const CreateTodoInputMock = {
  id: "test-todo-id",
  title: "test-todo-title",
  description: "test-todo-description",
  status: Status.PENDING,
};
