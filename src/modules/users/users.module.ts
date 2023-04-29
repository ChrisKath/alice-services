import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from '@/entities'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: []
})
export class UsersModule {}
