import {
  UseInterceptors,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';

import { map } from 'rxjs/operators';

import { plainToInstance } from 'class-transformer';
interface classConstructor {
  new (...args: any[]): {};
}
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: classConstructor) {}
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
