import { AppGateway } from './../../socket/socket-gateway';
import { UsersService } from './../../users/services/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/users.model';
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from 'src/auth/models/UserToken'
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService,
        private readonly socketGateway: AppGateway
        ) {}
    login(user: User): UserToken {
        const payload: UserPayload = {
            _id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        };
        const jwtToken = this.jwtService.sign(user);
        this.socketGateway.emitUserLogged(user)
        return {
            access_token: jwtToken,
            user: payload
        }
    }
    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid){
                return{
                    _id: user._id,
                    email: user.email, 
                    name: user.name,
                    roles: user.roles
                };
            }
        }
        throw new Error('Email ou senha incorreto');
    }
}
