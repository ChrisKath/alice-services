import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import type { UseRequest } from '@/types'

import { JWTGuard, UserGuard } from '@/modules/auth/auth.guard'
import { UsersService } from './users.service'
import { ChangePasswordDto, UpdateProfileDto } from './dto/users.dto'

@Controller('users')
export class UsersController {
  @Inject()
  private readonly usersService: UsersService

  @Get('profile')
  @UseGuards(JWTGuard)
  async profile(@Req() { user }: UseRequest) {
    try {
      return await this.usersService.profile(user.uid)
    } catch (error) {
      console.error(error)
      throw error || new ForbiddenException(error?.message || 'Something went wrong!')
    }
  }

  @Patch('profile')
  @UseGuards(UserGuard)
  async updateProfile(@Req() { user }: UseRequest, @Body() profileDto: UpdateProfileDto) {
    try {
      await this.usersService.update(user.uid, profileDto)

      return {
        statusCode: HttpStatus.OK,
        message: 'The record has been successfully updated.'
      }
    } catch (error) {
      console.error(error)
      throw error || new ForbiddenException(error?.message || 'Something went wrong!')
    }
  }

  @Patch('password')
  @UseGuards(UserGuard)
  async changePassword(@Req() { user }: UseRequest, @Body() { password }: ChangePasswordDto) {
    try {
      await this.usersService.update(user.uid, { password })

      return {
        statusCode: HttpStatus.OK,
        message: 'The record has been successfully updated.'
      }
    } catch (error) {
      console.error(error)
      throw error || new ForbiddenException(error?.message || 'Something went wrong!')
    }
  }
}
