import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export enum DirType {
  ALBUM,
  SEASON,
  TRACK
}

export enum DirCategory {
  Anime = 'anime',
  Movie = 'movie'
}

export class CreateDto {
  @IsNotEmpty()
  @IsEnum(DirType)
  dirType: DirType

  @IsNotEmpty()
  @IsEnum(DirCategory)
  dirCategory: DirCategory

  @IsNotEmpty()
  @IsString()
  dirPath: string
}
