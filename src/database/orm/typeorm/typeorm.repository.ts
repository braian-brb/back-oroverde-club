import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial, ObjectLiteral } from 'typeorm';
import { AbstractRepository } from '../../abstractions/abstract-repository';
import { BaseEntity } from '../../abstractions/entity-factory';

@Injectable()
export class TypeOrmRepository<T extends BaseEntity & ObjectLiteral>
    implements AbstractRepository<T> {
    constructor(private readonly repository: Repository<T>) {
        console.log(`[TypeOrmRepository] Repositorio inyectado para la entidad`);
    }

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
