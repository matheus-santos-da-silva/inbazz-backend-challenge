import { Status } from "@prisma/client";

interface TodoProps {
  title: string;
  description: string;
  status: Status;
  categoryId: string;
  createdAt: Date;
}

export class Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
  categoryId: string;
  createdAt: Date;

  constructor({
    title,
    description,
    status,
    categoryId,
    createdAt,
  }: TodoProps) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.categoryId = categoryId;
    this.createdAt = createdAt;
  }
}
