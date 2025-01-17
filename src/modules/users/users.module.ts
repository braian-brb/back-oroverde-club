import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { DynamicRepositoryModule } from '../../database/orm/typeorm/dynamic-repository.module';

@Module({
  imports: [
    DynamicRepositoryModule.forEntity(UserEntity), // Registra dinámicamente UserEntity
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
