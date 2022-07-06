import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../models/AuthRequest';
import { IsPublic } from '../decorators/is-public.decorator';



@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest){
        return this.authService.login(req.user);
    }
}
