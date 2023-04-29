import { Type } from 'class-transformer'
import { IsBoolean, IsString, IsOptional, IsUUID } from 'class-validator'

export class LoginDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsOptional()
  @IsBoolean()
  keepLoggedIn?: boolean
}

export class RefreshTokenDto {
  @IsUUID()
  key: string
}
