import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ApiTags('users')
export class User {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);