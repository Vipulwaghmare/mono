import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';
import { WinstonModule } from 'nest-winston';
import LokiTransport from 'winston-loki';
import winston from 'winston';

const isDevelopment = process.env.NODE_ENV === 'development';

const corsOrigin: CorsOptions['origin'] = ["https://vipulwaghmare.com", "https://www.vipulwaghmare.com", /\.vipulwaghmare\.com$/]
if (isDevelopment) {
  corsOrigin.push('http://localhost:5173')
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'DD/MM/YYYY, hh:mm:ss a' }),
            winston.format.printf(({ context, level, message, timestamp }) => {
              // Process ID (you can use a fixed number or get actual process ID)
              const pid = process.pid;

              // Colors similar to NestJS default logger
              const colorize = (text, color) => {
                const colors = {
                  green: '\x1B[32m',
                  yellow: '\x1B[33m',
                  reset: '\x1B[0m',
                };
                return `${colors[color]}${text}${colors.reset}`;
              };

              // Format like NestJS default logger
              return `${colorize('[Nest]', 'green')} ${pid}  - ${timestamp}     ${colorize(level.toUpperCase(), 'green')} ${colorize(`[${context}]`, 'yellow')} ${colorize(message, 'green')}`;
            })
          ),
        }),
        new winston.transports.File({
          filename: 'logfile.log',
          format: winston.format.json() // Keep JSON format for file logs
        }),
        new LokiTransport({
          host: process.env.LOKI_URL || 'http://localhost:3100',
          format: winston.format.json() // Loki works best with structured JSON
        })
      ]
    })
  });
  // Validation setup
  app.useGlobalPipes(
    new ValidationPipe()
  );
  app.use(cookieParser());
  // Swagger Setup
  // Doesn't work on vercel
  const config = new DocumentBuilder()
    .setTitle('Vipul Waghmare APIs')
    .setDescription('All the APIs created')
    .setVersion(process.env.npm_package_version)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // Generate swagger file
  if (isDevelopment) {
    fs.writeFileSync('./swagger.json', JSON.stringify(documentFactory(), null, 2));
    SwaggerModule.setup('api-docs', app, documentFactory);
  } else {
    // ONLY HANDLING THIS WAY DUE TO VERCE SWAGGER ISSUE WITH STATIC FILE
    const swaggerDocumentPath = path.join(__dirname, '..', 'swagger.json');
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerDocumentPath, 'utf8'));

    SwaggerModule.setup("api-docs", app, swaggerDocument, {
      customSiteTitle: "Api Docs",
      // customfavIcon: "https://avatars.githubusercontent.com/u/66200734?s=400&u=fe154367b1155c6d08830a39052847922120c330&v=4",
      customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
      ],
      customCssUrl: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
      ],
    });
  }

  app.use(helmet());
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
