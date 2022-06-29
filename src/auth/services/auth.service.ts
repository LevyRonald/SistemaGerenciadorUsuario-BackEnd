import { UsersService } from './../../users/services/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
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
