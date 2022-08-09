import { AppGateway } from './../../socket/socket-gateway';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModel } from '../models/users.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly socketGateway: AppGateway
    ) {}

  async create(user: User): Promise<UserModel> {
    const data = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }
    const NewUser = await this.userModel.create(data);
    this.socketGateway.emitnewUser(user)

    return { email: NewUser.email, name: NewUser.name, roles: NewUser.roles }
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<UserModel> {
    return await this.userModel.findById(id, { password: 0 });
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.userModel.findOne({
      email
    });
  }

  async update(id: string, user: User): Promise<UserModel> {
    const data = {
      ...user,
      password: await bcrypt.hash(user.password, 10)
    }

    const UpdateUser = await this.userModel.findByIdAndUpdate(id, data)
    this.socketGateway.emitupdateUser('id');

    return {email: UpdateUser.email, name: UpdateUser.name, roles: UpdateUser.roles}
  }

  async remove(id: string) {
    this.socketGateway.emitRemoveUser(id)
    return this.userModel.findByIdAndDelete(id)
  }
}
