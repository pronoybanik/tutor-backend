import { Document, Types } from "mongoose";
import { UserRole } from "../user/user.interface";

export interface IProfile extends Document {
    userId: Types.ObjectId;
    subjects: string[];
    bio: string;
    role: UserRole.ADMIN | UserRole.STUDENT | UserRole.TUTOR;
    experience: number;
    ratings: number;
    reviews: Types.ObjectId[];
    isVerified: boolean;
}
