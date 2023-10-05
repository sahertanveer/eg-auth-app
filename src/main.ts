import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function main() {
  dotenv.config();
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(5000);
}
main();
