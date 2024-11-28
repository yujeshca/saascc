import { User } from '@prisma/client';

export type AuthUser = Omit<User, 'password'>;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}