import { UserRole } from "../user/user.interface";


export interface IJwtPayload {
    userId: string;
    name: string;
    email: string;
    role: UserRole;
  }