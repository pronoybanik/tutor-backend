/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export enum UserRole {
    ADMIN = 'admin',
    student = 'student',
    tutor = "tutor"
}


export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: 'in-progress' | 'blocked';
}

export interface UserModel extends Model<IUser> {
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>;
    isUserExistsByEmail(id: string): Promise<IUser>;
    checkUserExist(userId: string): Promise<IUser>;
}

export type TUserRole = keyof typeof USER_ROLE;
