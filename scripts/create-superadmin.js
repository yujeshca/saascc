require('dotenv').config();
const { createClient } = require('@vercel/kv');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

async function createSuperAdmin() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.error('KV environment variables are not set');
    process.exit(1);
  }

  const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  try {
    const superadminData = {
      id: crypto.randomUUID(),
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: await bcrypt.hash('ElephantInRoom@123', 12),
      role: 'superadmin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existingUser = await kv.hgetall(`user:${superadminData.email}`);
    
    if (existingUser) {
      console.log('Superadmin already exists');
      process.exit(0);
    }

    await kv.hset(`user:${superadminData.email}`, superadminData);
    console.log('Superadmin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating superadmin:', error);
    process.exit(1);
  }
}

createSuperAdmin();