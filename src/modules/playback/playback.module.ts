import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlaybackController } from './playback.controller'
import { PlaybackService } from './playback.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [PlaybackService],
  controllers: [PlaybackController],
  exports: []
})
export class PlaybackModule {}
