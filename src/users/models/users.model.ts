import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
@ApiTags('users')
export class User {
  @Prop()
  @ApiProperty()
  @IsNotEmpty({
    message: 'Digite um nome de Usuário'
  })
  name: string;

  @Prop()
  @ApiProperty()
  @IsEmail({}, {
    message: 'Digite um endereço de email.'
  })
  email: string;
  
  @Prop()
  @ApiProperty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);