import { Body, Controller, ForbiddenException, Get, Inject, Post, Req, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v5 as uuidV5, NIL } from 'uuid'
import { existsSync } from 'fs'

import { SecretGuard } from '@/modules/auth/auth.guard'
import { SpaceService } from './space.service'
import { CreateDto, DirType } from './dto/space.dto'

@Controller('space')
export class SpaceController {
  @Inject(ConfigService)
  private readonly configService: ConfigService

  @Inject(SpaceService)
  private readonly spaceService: SpaceService

  @Post()
  @UseGuards(SecretGuard)
  async create(@Body() { dirType, dirCategory, dirPath }: CreateDto) {
    try {
      if (!existsSync(dirPath)) throw new ForbiddenException('Directory not found!')

      const dirName = this.spaceService.getName(dirPath)
      const groupId = uuidV5(dirName, NIL)

      switch (dirType) {
        case DirType.ALBUM:
          const album = await this.spaceService.getAlbum(dirPath)
          return { groupId, data: album }

        case DirType.SEASON:
          const season = await this.spaceService.getSeasonTracks(dirPath)
          return { groupId, data: season }

        case DirType.TRACK:
          const track = await this.spaceService.getTrackMetadata(dirPath)
          return { groupId, data: track }
      }
    } catch (error) {
      console.error(error)
      throw error || new ForbiddenException(error?.message || 'Something went wrong!')
    }
  }
}
