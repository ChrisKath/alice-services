import { Request } from 'express'
import { UserRole } from '@/constants'

export interface UseRequest extends Request {
  user: BearerTokenPayload
}

export interface BearerTokenPayload {
  uid: number
  role: UserRole
  iat: number
  exp: number
  iss: string
}

export interface Configs {
  isProduction: boolean
  isDevelop: boolean
  appName: string
  apiVersion: string
  port: number | string
  apiKey: string
  secretKey: string
  tokenExpires: string
  timeZonw: string
  database: DatabaseConfigs
  redis: RedisConfigs
  cache: CacheConfigs
}

export interface DatabaseConfigs {
  host: string
  port: number | string
  username: string
  password: string
}

export interface RedisConfigs {
  host: string
  port: number | string
}

export interface CacheConfigs {
  /** Time-To-Live, provide in milliseconds */
  ttl: number
  /** maximum number of items in cache */
  max: number
}

export interface AccessKey {
  accessToken: string
  refreshKey: string
  expiredAt: string
}
