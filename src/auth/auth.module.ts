import { Module } from '@nestjs/common';
import { AuthController } from './controllers/AuthController';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule } from 'src/users/models/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.KEY_MASTER_JWT,
    signOptions: { expiresIn: '8h' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
