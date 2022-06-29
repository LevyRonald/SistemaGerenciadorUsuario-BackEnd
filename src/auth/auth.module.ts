import { Module } from '@nestjs/common';
import { AuthController } from './controllers/AuthController';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule } from 'src/users/models/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
