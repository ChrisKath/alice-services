import { CacheOptionsFactory, Injectable, Inject, CacheManagerOptions } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService

  createCacheOptions(): CacheManagerOptions {
    return {
      ttl: this.configService.get<number>('cache.ttl'),
      max: this.configService.get<number>('cache.max')
    }
  }
}
