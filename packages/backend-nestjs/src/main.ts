import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
// import * as fs from 'fs';

const corsOrigin: CorsOptions['origin'] = [
  /\.vipulwaghmare\.com$/,
]
if (process.env.NODE_ENV === 'development') {
  corsOrigin.push('http://localhost:5173')
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // Validation setup
  app.useGlobalPipes(
    new ValidationPipe()
  );
  app.enableCors({
    origin: corsOrigin,
  })
  // Swagger Setup
  // Doesn't work on vercel
  const config = new DocumentBuilder()
    .setTitle('Vipul Waghmare APIs')
    .setDescription('All the APIs created')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // Generate swagger file
  // fs.writeFileSync('./swagger.json', JSON.stringify(documentFactory(), null, 2));
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
