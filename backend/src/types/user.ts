export type Role = 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
}

export interface AuthRequestUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}
