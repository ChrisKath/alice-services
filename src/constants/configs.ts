import * as dotenv from 'dotenv'
dotenv.config()

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelop = process.env.NODE_ENV === 'development'
export const appName = process.env.APP_NAME || 'project_alice'
export const apiVersion = String(process.env.API_VERSION || 1)
export const port = parseInt(process.env.SERVER_PORT, 10) || 3030
export const apiKey = process.env.API_SECRET_KEY || '330fc1c8-4a7d-5a74-881f-7b8a710f4d6c'
export const secretKey = process.env.JWT_SECRET || ''
export const tokenExpires = process.env.JWT_TTL || '1h'
export const timeZonw = process.env.TZ || 'Asia/Bangkok'

export const database = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}

export const redis = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 32768
}

export const cache = {
  ttl: parseInt(process.env.CACHE_TTL, 10) || 600000,
  max: parseInt(process.env.CACHE_MAX, 10) || 10
}
