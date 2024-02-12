import {Module} from "@nestjs/common";
import {GenericErrorFilter} from "./filters/generic-error.filter";
import {ClsModule} from "nestjs-cls";

@Module({
  imports: [
    ClsModule.register({
      interceptor: { generateId: true, mount: true },
    }),
  ],
  providers: [
    GenericErrorFilter,
  ],
  exports: [
    GenericErrorFilter,
  ],
})
export class CommonModule {}
