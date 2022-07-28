import { UsersModule } from './users/models/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/services/users.service';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI),
  UsersModule,
  AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
