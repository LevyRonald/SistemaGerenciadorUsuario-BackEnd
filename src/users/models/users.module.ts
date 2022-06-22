import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { User, UserSchema } from './users.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
