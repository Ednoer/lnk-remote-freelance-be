import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoopEmailModule } from './loop-email/loop-email.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(LoopEmailModule);

  const config = new DocumentBuilder()
  .setTitle('LNK Loop Email API')
  .setDescription('API LNK Loop Email API')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'Authorization',
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
