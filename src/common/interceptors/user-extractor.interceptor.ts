import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { apm } from "nestjs-elastic-apm";
import { catchError, Observable, tap } from "rxjs";
import jwt from "../utils/jwt.util";
import Utils from "../utils/utils.util";

@Injectable()
export class UserExtractorInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest();
    const { headers } = req;
    const token = this.extractTokenFromAuthHeader(headers.authorization);
    try {
      const decodedToken = await jwt.Utils.decodeToken(token);
      apm.setUserContext({
        username: decodedToken?.preferred_username,
      });
    } catch (e) {}

    return next.handle().pipe(
      tap(),
      catchError((err) => {
        throw err;
      })
    );
  }

  extractTokenFromAuthHeader = (authHeader: string): string | null => {
    const bearerTokenPattern = new RegExp("(?<=Bearer ).*");
    if (
      Utils.string.isEmpty(authHeader) ||
      !bearerTokenPattern.test(authHeader)
    ) {
      return null;
    }

    const [token] = authHeader.match(bearerTokenPattern);
    return token;
  };
}
