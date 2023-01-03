import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';

  @Injectable()
  export class ApikeyGuard implements CanActivate {
    constructor() {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      if (!request.headers.apikey) {
        throw new HttpException(
          `The apikey is not found`,
          HttpStatus.UNAUTHORIZED
        );
      }

      if (request.headers?.apikey !== process.env.API_KEY)
      {
        throw new HttpException(
          `The apikey is not matched`,
          HttpStatus.UNAUTHORIZED
        );
      }
      return true;
    }
  }
  