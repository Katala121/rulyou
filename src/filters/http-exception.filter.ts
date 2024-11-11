import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP');
  catch(error: any, host: ArgumentsHost) {
    this.logger.error(error.stack);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.getStatus ? error.getStatus() : 400;
    const message = error.msg || error.message || 'Bad request';
    response.status(status).json({
      success: false,
      msg: message
    });
  }
}
