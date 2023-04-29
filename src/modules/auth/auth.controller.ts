import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  NotFoundException,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import type { UseRequest } from '@/types'

import { AuthService } from './auth.service'
import { JWTGuard, SecretGuard } from './auth.guard'
import { LoginDto, RefreshTokenDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService

  @Post('login')
  @UseGuards(SecretGuard)
  async login(@Body() { username, password }: LoginDto) {
    try {
      const token = await this.authService.validateUser(username, password)

      if (!token) throw new NotFoundException('Your auth data is incorrect!')
      return token
    } catch (error) {
      console.error(error)
      throw error || new ForbiddenException(error?.message || 'Something went wrong!')
    }
  }

  @Get('refreshToken')
  @UseGuards(SecretGuard)
  async refreshToken(@Query() { key }: RefreshTokenDto) {
    try {
      const token = await this.authService.validateRefreshKey(key)

      if (!token) throw new BadRequestException('Your `refreshKey` is incorrect!')
      return token
    } catch (error) {
      console.error(error)
      throw error || new ForbiddenException(error?.message || 'Something went wrong!')
    }
  }

  @Get('profile')
  @UseGuards(JWTGuard)
  async profile(@Req() { user }: UseRequest) {
    try {
      return await this.authService.getProfile(user.uid)
    } catch (error) {
      console.error(error)
      throw error || new ForbiddenException(error?.message || 'Something went wrong!')
    }
  }
}
