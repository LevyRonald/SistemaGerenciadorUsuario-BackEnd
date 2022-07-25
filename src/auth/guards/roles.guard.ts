import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/users.model';
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from '../models/role.enum';
import {ROLES} from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate{
    private JwtService = new JwtService();
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>  {
        const req = context.switchToHttp().getRequest();
        const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES, [
            context.getHandler(),
            context.getClass()
        ]);

        if(!requireRoles){
            return true;
        }
        const token = req.headers.authorization;
        const payload = this.JwtService.decode(token.split(' ')[1], { json: true }) as { roles: Role }
        return requireRoles.some((role) => payload.roles?.includes(role))
    }
}