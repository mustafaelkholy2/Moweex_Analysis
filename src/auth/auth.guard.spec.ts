import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(() => {
    // Create mock instances of JwtService and ConfigService
    jwtService = new JwtService({}); // Provide mock options if needed
    configService = new ConfigService();
  });

  it('should be defined', () => {
    const guard = new AuthGuard(jwtService, configService);
    expect(guard).toBeDefined();
  });
});
