import * as configs from './configs'
import type { Configs } from '@/types'

export { configs }
export const { database, redis, cache }: Configs = configs

export enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export enum Genres {
  ANIME = 'Anime',
  MOVIE = 'Movie',
  SERIE = 'Serie'
}

export enum WatchStatus {
  NEW = 'new',
  COMTINUE = 'continue'
}
