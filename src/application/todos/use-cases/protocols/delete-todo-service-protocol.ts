export abstract class DeleteTodoServiceProtocol {
  abstract delete(id: string): Promise<void>;
}
