import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';

const corsOrigin: CorsOptions['origin'] = [
  /\.vipulwaghmare\.com$/,
]
if (isDevelopment) {
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
  if (false) {
    fs.writeFileSync('./swagger.json', JSON.stringify(documentFactory(), null, 2));
    SwaggerModule.setup('api-docs', app, documentFactory);
  } else {
    // ONLY HANDLING THIS WAY DUE TO VERCE SWAGGER ISSUE WITH STATIC FILE
    const swaggerDocumentPath = path.join(__dirname, '..', 'swagger.json');
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerDocumentPath, 'utf8'));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  }

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
