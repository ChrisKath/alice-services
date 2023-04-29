import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { Users } from '@/entities'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthStrategy } from './auth.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('secretKey'),
        signOptions: {
          issuer: configService.get<string>('appName'),
          expiresIn: configService.get<string>('tokenExpires')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}
