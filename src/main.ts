import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3010);
}
bootstrap();
