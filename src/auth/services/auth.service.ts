import { UsersService } from './../../users/services/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserModel } from 'src/users/models/users.model';
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from 'src/auth/models/UserToken'
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
    login(user: UserModel): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
        }
    }
    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid){
                return{
                    ...user,
                    password: undefined,
                };
            }
        }
        throw new Error('Email ou senha incorreto');
    }
}
