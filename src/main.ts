import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { LoggingInterceptor } from '@/helpers/logger.interceptor'
import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configs = app.get(ConfigService)

  app.setGlobalPrefix('services')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    maxAge: 3600
  })

  await app.listen(configs.get<number>('port'))
}

bootstrap()
