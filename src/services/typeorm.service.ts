import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Albums, Tags, Tracks, Users, Watch } from '@/entities'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      entities: [Albums, Tags, Tracks, Users, Watch],
      autoLoadEntities: true,
      synchronize: false, // never use TRUE in production!
      logging: ['error', 'warn', 'log']
    }
  }
}
