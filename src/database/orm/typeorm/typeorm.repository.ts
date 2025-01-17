import { Injectable, Type } from '@nestjs/common';
import { Repository, DeepPartial, ObjectLiteral } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../abstractions/base-repository.interface';
import { BaseEntity } from '../../abstractions/entity-factory';

@Injectable()
export class TypeOrmRepository<T extends BaseEntity & ObjectLiteral> implements BaseRepository<T> {
    constructor(
        @InjectRepository(Object as unknown as Type<T>) 
        private readonly repository: Repository<T>,
    ) {}

    async create(data: Partial<T>): Promise<T> {
        const entity = this.repository.create(data as DeepPartial<T>);
        return await this.repository.save(entity);
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<T | null> {
        const entity = await this.repository.findOneBy({ id } as any);
        return entity || null;
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        await this.repository.update({ id } as any, data as any);
        const updatedEntity = await this.repository.findOneBy({ id } as any);
        return updatedEntity || null;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
