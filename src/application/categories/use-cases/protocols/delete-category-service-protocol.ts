export abstract class DeleteCategoryServiceProtocol {
  abstract delete(id: string): Promise<void>;
}
