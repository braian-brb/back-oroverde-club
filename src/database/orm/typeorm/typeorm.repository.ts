import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../abstractions/base-repository.interface';

@Injectable()
export class TypeOrmRepository<T> implements BaseRepository<T> {
    constructor(
        @InjectRepository() private readonly repository: Repository<T>,
    ) { }

    async create(data: Partial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<T | null> {
        const entity = await this.repository.findOne({ where: { id } as any });
        return entity || null;
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        await this.repository.update(id, data);
        const updatedEntity = await this.repository.findOne({ where: { id } as any });
        return updatedEntity || null;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
