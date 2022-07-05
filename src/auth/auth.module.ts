import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './controllers/AuthController';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule } from 'src/users/models/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware} from './middlewares/login-validation.middleware';
@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.KEY_MASTER_JWT,
    signOptions: { expiresIn: '8h' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}