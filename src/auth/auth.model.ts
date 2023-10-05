import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  name: string;
  password: string;
}

export interface UserResponse {
  email: string;
  name: string;
  id: string;
  accessToken: string;
  refreshToken: string;
}
