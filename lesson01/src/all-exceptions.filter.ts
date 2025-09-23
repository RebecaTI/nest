import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type MeuObjetoResponse = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const minhaResponseObj: MeuObjetoResponse = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      minhaResponseObj.statusCode = exception.getStatus();
      minhaResponseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      minhaResponseObj.statusCode = 422;
      minhaResponseObj.response = exception.message.replaceAll(/\n/g, ' ');
    } else {
      minhaResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      minhaResponseObj.response = 'Internal server error';
    }

    response.status(minhaResponseObj.statusCode).json(minhaResponseObj);

    this.logger.error(minhaResponseObj.response, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}
