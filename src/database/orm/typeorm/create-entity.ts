import { ColumnConfig } from 'src/database/abstractions/entity-factory';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export function createTypeOrmEntity<T>(
    entityName: string,
    columns: ColumnConfig[],
): { new(): T } {
    @Entity(entityName)
    class DynamicTypeOrmEntity {
        @PrimaryGeneratedColumn()
        id: number;

        constructor(partial: Partial<T>) {
            Object.assign(this, partial);
        }
    }

    columns.forEach(({ name, type = 'string', unique, default: defaultValue }) => {
        Column({ type, unique, default: defaultValue })(DynamicTypeOrmEntity.prototype, name);
    });

    return DynamicTypeOrmEntity;
}
