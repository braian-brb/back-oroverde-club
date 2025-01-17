import { ColumnConfig } from 'src/database/abstractions/entity-factory';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export function createTypeOrmEntity<T extends { id: number }>(
    entityName: string,
    columns: ColumnConfig[],
): new (partial?: Partial<T>) => T {
    @Entity(entityName) // Usa el nombre correcto de la entidad
    class DynamicTypeOrmEntity {
        @PrimaryGeneratedColumn()
        id!: number;

        constructor(partial?: Partial<T>) {
            if (partial) {
                Object.assign(this, partial);
            }
        }
    }

    columns.forEach(({ name, type = 'string', unique, default: defaultValue }) => {
        Column({ type, unique, default: defaultValue })(DynamicTypeOrmEntity.prototype, name);
    });

    // Asigna dinámicamente el nombre a la clase
    Object.defineProperty(DynamicTypeOrmEntity, 'name', { value: entityName });

    return DynamicTypeOrmEntity as any as new (partial?: Partial<T>) => T;
}
