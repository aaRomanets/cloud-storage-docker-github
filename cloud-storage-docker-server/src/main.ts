import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});

  //допускаем запросы с других url
  app.enableCors({credentials: true, origin: true}); 

  //создаем папку uploads в которую будем загружать файлы авторизованных пользовательей 
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  //запускаем сервер
  const PORT = process.env.PORT || 3027;
  await app.listen(PORT);
}
bootstrap();
