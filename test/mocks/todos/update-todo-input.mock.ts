import { Status } from "@prisma/client";

export const UpdateTodoInputMock = {
  id: "test-todo-id",
  title: "updated-todo-title",
  description: "updated-todo-description",
  status: Status.COMPLETED,
};
