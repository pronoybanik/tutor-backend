/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel, UserRole } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../middlewares/AppError';
import httpStatus from 'http-status';


const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: [UserRole.ADMIN, UserRole.student, UserRole.ADMIN],
            default: UserRole.student
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress',
        },

    },
    {
        timestamps: true,
    },
);


userSchema.pre('save', async function (next) {
    const user = this;

    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );

    next();
});

userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

userSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    },
});

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
};

userSchema.statics.checkUserExist = async function (userId: string) {
    const existingUser = await this.findById(userId);

    if (!existingUser) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'User does not exist!');
    }

    if (!existingUser.isActive) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'User is not active!');
    }

    return existingUser;
};

export const User = model<IUser, UserModel>('user', userSchema);
