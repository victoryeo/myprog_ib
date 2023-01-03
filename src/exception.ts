import { Catch, ExceptionFilter } from "@nestjs/common";
import { HttpAdapterHost, ArgumentsHost } from "@nestjs/common";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const msg = exception.getResponse();

    //console.warn(response.status);
    //console.error(response.json())

    response
    .status(status)
    .json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: msg 
    });
  }
}