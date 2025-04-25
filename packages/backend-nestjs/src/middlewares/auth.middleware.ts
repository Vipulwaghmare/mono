import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CryptoService } from '../services/crypto.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private cryptoService: CryptoService,) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] || req.headers['Authorization'] || req.cookies['accessToken'];

    if (!token || typeof token !== 'string') {
      this.logger.warn('Unauthorized access attempt - No valid token found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = await this.cryptoService.verifyAccessToken(token);
      req.body.jwtPayload = {
        userId: decoded.userId,
        userEmail: decoded.userEmail,
      };
      this.logger.debug(`User authenticated: ${decoded.userEmail}`);
    } catch (err) {
      this.logger.warn(`Token verification failed: ${err.message}`);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }
}
