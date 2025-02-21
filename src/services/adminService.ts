import { 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  lastLogin?: Date;
}

export const adminService = {
  async createUser(email: string, role: 'admin' | 'editor'): Promise<void> {
    const usersRef = collection(db, 'admin_users');
    await addDoc(usersRef, {
      email,
      role,
      createdAt: new Date(),
    });
  },

  async getUsers(): Promise<AdminUser[]> {
    const usersRef = collection(db, 'admin_users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      lastLogin: doc.data().lastLogin?.toDate(),
    })) as AdminUser[];
  },

  async updateUserRole(userId: string, role: 'admin' | 'editor'): Promise<void> {
    const userRef = doc(db, 'admin_users', userId);
    await updateDoc(userRef, { role });
  },

  async deleteUser(userId: string): Promise<void> {
    const userRef = doc(db, 'admin_users', userId);
    await deleteDoc(userRef);
  },

  async checkAdminAccess(email: string): Promise<boolean> {
    const usersRef = collection(db, 'admin_users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }
}; 