import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service'; // Import JwtService from the correct path

@Module({
  providers: [JwtService], // Define JwtService as a provider
})
export class JwtModule {}
