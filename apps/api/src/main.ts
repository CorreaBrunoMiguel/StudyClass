import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const webOrigin = config.get<string>('WEB_ORIGIN', 'http://localhost:3000');

  app.enableCors({
    origin: webOrigin,
    credentials: true,
  });

  const port = Number(config.get<string>('PORT', '3001'));
  await app.listen(port);

  console.log(`API listening on http://localhost:${port}`);
}

bootstrap();
