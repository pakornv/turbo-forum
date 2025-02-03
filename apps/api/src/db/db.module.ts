import { Global, Module } from "@nestjs/common";
import { DbService } from "./db.service";

@Global()
@Module({
  // providers: [
  //   {
  //     provide: DbService,
  //     inject: [DbService],
  //     useFactory: () => {
  //       return drizzle({
  //         schema: { communities, users, ...posts },
  //         connection: { url: process.env.DB_FILE_NAME },
  //         casing: "snake_case",
  //       });
  //     },
  //   },
  // ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
