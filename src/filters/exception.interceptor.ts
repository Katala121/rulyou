import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler, Logger
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger('INTERCEPTOR');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(error.stack);
        const message = (error?.response?.message?.length && error?.response?.message[0]) || error?.message || 'Bad request';
        return throwError(() => ({
          success: false,
          msg: message
        }));
      })
    );
  }
}
