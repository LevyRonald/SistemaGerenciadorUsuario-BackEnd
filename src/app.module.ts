import { UsersModule } from './users/models/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:root@db:27017/banco?authSource=admin'),
  UsersModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
