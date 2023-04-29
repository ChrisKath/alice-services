import { Expose, Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class BaseDto {
  @Expose()
  @Type(() => Number)
  id: number
}

export class QueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number
}
