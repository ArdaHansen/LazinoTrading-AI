import bcrypt from 'bcryptjs';
const adminHash = bcrypt.hashSync('LazinoAdmin123!', 10);
const employeeHash = bcrypt.hashSync('LazinoEmployee123!', 10);
export const users = [
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
export function findUserByEmail(email) {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}
