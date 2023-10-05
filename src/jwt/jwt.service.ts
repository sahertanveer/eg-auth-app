import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

interface JwtPayload {
  userId: string;
}

@Injectable()
export class JwtService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';
  }

  generateAccessToken(payload: Record<string, any>): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: Record<string, any>): string {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '7d' });
  }

  verifyAccessToken(token: string): Record<string, any> {
    return jwt.verify(token, this.accessTokenSecret) as Record<string, any>;
  }

  verifyRefreshToken(refreshToken: string): JwtPayload {
    try {
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);

      if (typeof decoded === 'string') {
        throw new Error('Invalid refresh token');
      }

      if (!decoded.userId) {
        throw new Error('Invalid refresh token');
      }

      return decoded as JwtPayload;
    } catch (error: any) {
      throw new Error('Invalid refresh token');
    }
  }
}
