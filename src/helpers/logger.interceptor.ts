import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { differenceInMilliseconds, format } from 'date-fns'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const http = context.switchToHttp()
        const [req, res] = [http.getRequest<Request>(), http.getResponse<Response>()]

        console.log(
          `\x1b[32m[Request] -`,
          `\x1b[0m${format(Date.now(), 'M/d/Y, pp')}`,
          `\x1b[34m[${req.method}]`,
          res.statusCode,
          req.url,
          `~ \x1b[35m${differenceInMilliseconds(Date.now(), now)}ms\x1b[0m`
        )
      })
    )
  }
}
