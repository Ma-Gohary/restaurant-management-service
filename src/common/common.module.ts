import {Module} from "@nestjs/common";
import {GenericErrorFilter} from "./filters/generic-error.filter";
import {ClsModule} from "nestjs-cls";
import {UserExtractorInterceptor} from "./interceptors/user-extractor.interceptor";

@Module({
  imports: [
    ClsModule.register({
      interceptor: { generateId: true, mount: true },
    }),
  ],
  providers: [
    GenericErrorFilter,
    UserExtractorInterceptor
  ],
  exports: [
    GenericErrorFilter,
    UserExtractorInterceptor
  ],
})
export class CommonModule {}
