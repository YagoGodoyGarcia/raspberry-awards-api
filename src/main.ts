import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Raspberry Awards API')
    .setDescription('Documentação da API do projeto Raspberry Awards')
    .setVersion('1.0')
    .addTag('movies') // opcional
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger-ui', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
