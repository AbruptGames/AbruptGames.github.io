import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv-flow';
import { AdminModule } from './admin/admin.module';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);

  const adminApp = await NestFactory.create(AdminModule);
  adminApp.enableCors()
  await adminApp.listen(3001);
}
bootstrap();
