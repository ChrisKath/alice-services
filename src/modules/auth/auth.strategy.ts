import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { BearerTokenPayload } from '@/types'

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt-guard') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secretKey')
    })
  }

  async validate(payload: BearerTokenPayload) {
    return payload
  }
}
