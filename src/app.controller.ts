import { CACHE_MANAGER, Controller, Get, HttpException, HttpStatus, Inject, Query } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import { v5 as uuidV5, NIL } from 'uuid'

import docs from 'docs/db.json'

@Controller()
export class AppController {
  @Inject(ConfigService)
  private readonly configService: ConfigService

  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache

  @Get('generateKey')
  async generateKey(@Query('secertKey') secertKey: string) {
    try {
      const appName = this.configService.get<string>('appName')
      const key = uuidV5(`${appName}/${secertKey}`, NIL)
      return {
        file: '.env',
        key: 'API_SECRET_KEY',
        value: key
      }
    } catch (error) {
      console.error(error)
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('cache')
  async getCache() {
    const cachedDocs = await this.cacheManager.get('docs/1')
    if (cachedDocs) return cachedDocs

    const _docs = docs.find((r) => r.id === 1)
    this.cacheManager.set('docs/1', _docs)
    return _docs
  }
}
