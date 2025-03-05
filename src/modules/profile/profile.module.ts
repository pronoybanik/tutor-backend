import { Schema, model } from 'mongoose';
import { IProfile } from './profile.interface';
import { UserRole } from '../user/user.interface';

const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String, // Profile picture URL
    },
    bio: {
      type: String,
      trim: true, // A short introduction about the tutor
    },
    subjects: {
      type: [String],
    },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR],
      default: UserRole.STUDENT,
    },
    experience: {
      type: Number,
      min: 0,
    },
    rates: {
      hourlyRate: {
        type: Number,
        required: true,
        min: 0,
      },
      discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
    availability: [
      {
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    requestRole: {
      type: String,
      enum: [UserRole.TUTOR, UserRole.STUDENT],
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    callToAction: {
      type: String, // Example: "Book a session now!"
      enum: ['done', 'cancel', 'in-progress'],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile = model<IProfile>('Profile', ProfileSchema);
