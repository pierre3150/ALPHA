import bcrypt from 'bcryptjs';
import { User } from './models/index.js';
import generateToken from './utils/jwt.utils.js';

async function testAuth() {
  try {
    console.log('1. Finding user...');
    const user = await User.findOne({ where: { username: 'testuser' } });
    if (!user) {
      console.log('User not found');
      return;
    }
    console.log('2. User found:', user.username);
    
    console.log('3. Testing password...');
    const validPassword = await bcrypt.compare('testpass123', user.passwordHash);
    console.log('4. Password valid:', validPassword);
    
    if (validPassword) {
      console.log('5. Generating token...');
      const token = generateToken(user);
      console.log('6. Token generated:', token ? 'SUCCESS' : 'FAILED');
      console.log('   Token length:', token?.length || 0);
    }
  } catch (error) {
    console.error('Error in auth test:', error);
  }
  process.exit(0);
}

testAuth();