import { createEntity } from '../../../database/abstractions/entity-factory';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
}

export const UserEntity = createEntity<User>('typeorm', 'User', [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'text', unique: true },
    { name: 'password', type: 'text' },
    { name: 'isActive', type: 'boolean', default: true },
]);

console.log(`[UserEntity] Registrada como: User`);
