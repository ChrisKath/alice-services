import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SpaceController } from './space.controller'
import { SpaceService } from './space.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [SpaceService],
  controllers: [SpaceController],
  exports: []
})
export class SpaceModule {}
