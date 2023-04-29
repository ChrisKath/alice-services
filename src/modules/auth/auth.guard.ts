import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotAcceptableException,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { v5 as uuidV5, NIL } from 'uuid'
import { UserRole } from '@/constants'

@Injectable()
export class JWTGuard extends AuthGuard('jwt-guard') {}

@Injectable()
export class UserGuard extends AuthGuard('jwt-guard') {
  /**
   * @type user as `BearerTokenPayload`
   */
  handleRequest(error: unknown, user: any) {
    if (!user || error) throw new UnauthorizedException()
    else if (user.role !== UserRole.USER) throw new BadRequestException('Permission denied!')

    return user
  }
}

@Injectable()
export class AdminGuard extends AuthGuard('jwt-guard') {
  /**
   * @type user as `BearerTokenPayload`
   */
  handleRequest(error: unknown, user: any) {
    if (!user || error) throw new UnauthorizedException()
    else if (user.role !== UserRole.ADMIN) throw new BadRequestException('Permission denied!')

    return user
  }
}

@Injectable()
export class SecretGuard implements CanActivate {
  @Inject(ConfigService)
  private readonly configService: ConfigService

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const secertKey = request.get('api-secret-key')

    const appName = this.configService.get<string>('appName')
    const apiKey = this.configService.get<string>('apiKey')

    if (!secertKey || apiKey !== uuidV5(`${appName}/${secertKey}`, NIL)) {
      throw new NotAcceptableException('Access denied: `api-secret-key` incorrect!')
    }

    return true
  }
}
