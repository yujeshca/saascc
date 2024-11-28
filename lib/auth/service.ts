import { prisma } from '@/lib/db/prisma';
import { hashPassword, verifyPassword } from './utils';
import { RegisterData, AuthUser } from './types';

export class AuthService {
  static async createUser(data: RegisterData): Promise<AuthUser> {
    const hashedPassword = await hashPassword(data.password);
    
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return user;
  }

  static async validateCredentials(email: string, password: string): Promise<AuthUser> {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      throw new Error('No user found with this email');
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    const { password: _, ...authUser } = user;
    return authUser;
  }

  static async getUserById(id: string): Promise<AuthUser | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return user;
  }
}