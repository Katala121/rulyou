import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler, Logger
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(
    private prisma: PrismaService
  ) {}
  private readonly logger = new Logger('INTERCEPTOR');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(error.stack);
        let message = '';
        if (error instanceof Prisma.PrismaClientKnownRequestError) message = this.prisma.handlePrismaError(error);
        else if (error.message.includes('prisma')) message = 'Ошибка выполенения запроса';
        else message = (error?.response?.message?.length && error?.response?.message[0]) || error?.message || 'Ошибка выполенения запроса';
        return throwError(() => ({
          success: false,
          msg: message
        }));
      })
    );
  }
}
