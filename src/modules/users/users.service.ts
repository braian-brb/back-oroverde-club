import { Injectable, Inject } from '@nestjs/common';
import { AbstractRepository } from '../../database/abstractions/abstract-repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserDbRepository')
    private readonly userRepository: AbstractRepository<User>,
  ) {
  }

  async create(data: Partial<User>): Promise<User> {
    console.log('[UsersService] Creando usuario...');
    return this.userRepository.create(data);
  }

  async findAll(): Promise<User[]> {
    console.log('[UsersService] Obteniendo todos los usuarios...');
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    console.log(`[UsersService] Obteniendo usuario con ID: ${id}`);
    return this.userRepository.findOne(id);
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    console.log(`[UsersService] Actualizando usuario con ID: ${id}`);
    return this.userRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    console.log(`[UsersService] Eliminando usuario con ID: ${id}`);
    await this.userRepository.delete(id);
  }
}
