import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/users.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const data = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }
    return this.userModel.create(data);
  }

  findAll() {
    console.log(this.userModel.find())
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id)
  }

  update(id: string, user: User) {
    return this.userModel.findByIdAndUpdate(id, user)
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}
