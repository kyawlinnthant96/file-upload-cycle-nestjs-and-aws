import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from './config/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  const configService = app.get<ConfigService<EnvVars>>(ConfigService);
  await app.listen(configService.get('PORT') || 7000);
  console.log(`Server started on ${await app.getUrl()}`);
}

bootstrap();
