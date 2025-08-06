import { Module } from "@nestjs/common";
import { CategoryModule } from "./modules/category.module";

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
