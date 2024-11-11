import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorFilter } from './filters/http-exception.filter';
import { ExceptionInterceptor } from './filters/exception.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
})
export class AppModule {}