import { CACHE_MANAGER, Body, Controller, Get, Inject, Post, Req, UseGuards, Param } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'

import { PlaybackService } from './playback.service'
import docs from 'docs/db.json'

@Controller('playback')
export class PlaybackController {
  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache

  @Inject(ConfigService)
  private readonly configService: ConfigService

  @Inject(PlaybackService)
  private readonly playbackService: PlaybackService

  @Get(':id')
  async getCache(@Param('id') id: string) {
    let master = null
    const cached = await this.cacheManager.get('docs/' + id)
    if (cached) {
      master = cached
    } else {
      const _docs = docs.find((r) => r.groupId === id)
      master = _docs
      this.cacheManager.set('docs/1', _docs)
    }

    return master
  }
}
