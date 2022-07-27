import { UsersModule } from './users/models/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/services/users.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:root@db:27017/banco?authSource=admin'),
  UsersModule,
  AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
