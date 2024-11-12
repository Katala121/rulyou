import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP');
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.getStatus ? error.getStatus() : 400;
    const message = error.msg || error.message || 'Bad request';
    this.logger.error(message);
    response.status(status).json({
      success: false,
      result: {
        error: message
      }
    });
  }
}
