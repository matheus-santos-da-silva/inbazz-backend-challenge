import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth.module";
import { TodoModule } from "./modules/todo.module";
import { CategoryModule } from "./modules/category.module";

@Module({
  imports: [AuthModule, CategoryModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
