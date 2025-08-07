import { Module } from "@nestjs/common";
import { TodoModule } from "./modules/todo.module";
import { CategoryModule } from "./modules/category.module";

@Module({
  imports: [CategoryModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
