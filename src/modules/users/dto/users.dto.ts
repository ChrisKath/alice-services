import { Type } from 'class-transformer'
import { IsEnum, IsEmail, IsOptional, IsString, IsUrl, MinLength, MaxLength } from 'class-validator'
import { UserRole } from '@/constants'

export class UsersDto {
  @IsString()
  key: string
}

export class UpdateProfileDto {
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  displayName?: string

  @IsUrl()
  @IsOptional()
  avatar?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @IsOptional()
  username?: string

  @IsString()
  @MaxLength(255)
  @IsOptional()
  bio?: string
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string
}
