
import { WinstonModule } from 'nest-winston';
import LokiTransport from 'winston-loki';
import winston from 'winston';

const customLogger = WinstonModule.createLogger({
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
});

export default customLogger;