import { Module, CacheModule, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configs } from '@/constants'

import { TypeOrmConfigService } from '@/services/typeorm.service'
import { CacheConfigService } from '@/services/cache.service'

import { AppController } from './app.controller'
import { AuthModule } from '@/modules/auth/auth.module'
import { PlaybackModule } from '@/modules/playback/playback.module'
import { SpaceModule } from '@/modules/space/space.module'
import { UsersModule } from '@/modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [() => configs]
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService
    }),
    AuthModule,
    PlaybackModule,
    SpaceModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [],
  exports: []
})
export class AppModule implements OnApplicationBootstrap {
  onApplicationBootstrap() {}
}
