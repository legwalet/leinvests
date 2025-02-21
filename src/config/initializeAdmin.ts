import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { adminService } from '../services/adminService';

export const initializeAdmin = async () => {
  try {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('Admin credentials not found in environment variables');
      return;
    }

    // Try to sign in first
    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      console.log('Admin signed in successfully');
      return;
    } catch (error: any) {
      // If user doesn't exist, the error code will be 'auth/user-not-found'
      if (error.code !== 'auth/user-not-found') {
        throw error;
      }
    }

    // If we get here, the user doesn't exist, so create it
    await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log('Admin account created successfully');

  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin account already exists');
      return;
    }
    console.error('Failed to initialize admin:', error);
  }
}; 