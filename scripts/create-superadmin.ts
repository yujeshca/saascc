import { prisma } from '../lib/db/prisma';
import { hash } from 'bcryptjs';

async function createSuperAdmin() {
  try {
    const hashedPassword = await hash('ElephantInRoom@123', 12);
    
    const superadminData = {
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: hashedPassword,
      role: 'SUPERADMIN',
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: superadminData.email },
    });
    
    if (existingUser) {
      console.log('Superadmin already exists');
      process.exit(0);
    }

    await prisma.user.create({ data: superadminData });
    console.log('Superadmin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating superadmin:', error);
    process.exit(1);
  }
}

createSuperAdmin();