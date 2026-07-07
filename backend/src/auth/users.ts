import bcrypt from 'bcryptjs';
import { User } from '../types/user.js';

const adminHash = bcrypt.hashSync('LazinoAdmin123!', 10);
const employeeHash = bcrypt.hashSync('LazinoEmployee123!', 10);

export const users: User[] = [
  {
    id: 'usr_admin_001',
    name: 'Lazino Admin',
    email: 'admin@lazinotrading.ai',
    passwordHash: adminHash,
    role: 'admin'
  },
  {
    id: 'usr_employee_001',
    name: 'Lazino Employee',
    email: 'employee@lazinotrading.ai',
    passwordHash: employeeHash,
    role: 'employee'
  }
];

export function findUserByEmail(email: string) {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}
