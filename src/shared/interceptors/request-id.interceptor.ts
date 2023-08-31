import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { REQUEST_ID_HEADER } from '../constants'

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()

    const requestId = request.headers[REQUEST_ID_HEADER]

    request.requestId = requestId ?? uuidv4()

    return next.handle()
  }
}