import mongoose from 'mongoose';

import { User as UserModel, UserRole } from '../common';

import { ModelReference } from './modelReference';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'owner', 'tenant'], default: UserRole.Tenant },
    phone: String,
    password: { type: String, required: true },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelReference.Request
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const User: mongoose.Model<UserModel> = mongoose.model(ModelReference.User, UserSchema);
export default User;