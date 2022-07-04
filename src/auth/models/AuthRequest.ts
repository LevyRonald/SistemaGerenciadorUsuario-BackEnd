import { UserModel } from './../../users/models/users.model';
import { Request } from "express";

export interface AuthRequest extends Request {
    user: UserModel;
}