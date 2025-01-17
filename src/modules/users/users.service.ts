import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/abstractions/base-repository.interface';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: BaseRepository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
