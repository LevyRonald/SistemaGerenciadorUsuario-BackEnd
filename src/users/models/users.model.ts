import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, isNotEmpty, IsNotEmpty, Matches, } from 'class-validator';
import { Document } from 'mongoose';
import { Role } from '../../auth/models/role.enum';

export interface UserModel {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  roles: Role
}

export type UserDocument = User & Document;
@Schema()
@ApiTags('users')
export class User implements UserModel {
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

  @Prop()
  @ApiProperty()
  @IsNotEmpty({
    message: 'Escolha um Cargo'
  })
  roles: Role;

}

export const UserSchema = SchemaFactory.createForClass(User);