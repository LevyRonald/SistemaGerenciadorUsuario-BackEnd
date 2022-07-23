import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModel } from '../models/users.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(user: User): Promise<UserModel> {
    const data = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }
    const NewUser = await this.userModel.create(data);

    return { email: NewUser.email, name: NewUser.name, roles: NewUser.roles }
  }

  findAll() {
    console.log(this.userModel.find())
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id)
  }

  findByEmail(email: string) {
    return this.userModel.findOne({
      email
    });
  }

  update(id: string, user: User) {
    return this.userModel.findByIdAndUpdate(id, user)
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}
