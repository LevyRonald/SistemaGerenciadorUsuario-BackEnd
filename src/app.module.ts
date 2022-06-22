import { UsersModule } from './users/models/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27018/banco'),
  UsersModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
