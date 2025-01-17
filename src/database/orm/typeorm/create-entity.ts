import { ColumnConfig } from 'src/database/abstractions/entity-factory';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export function createTypeOrmEntity<T extends { id: number }>(
    entityName: string,
    columns: ColumnConfig[],
): new (partial?: Partial<T>) => T {
    @Entity(entityName)
    class CustomEntity {
        @PrimaryGeneratedColumn()
        id!: number;

        constructor(partial?: Partial<T>) {
            if (partial) {
                Object.assign(this, partial);
            }
        }
    }

    // Definimos las columnas
    columns.forEach(({ name, type = 'text', unique, default: defaultValue }) => {
        Column({ type, unique, default: defaultValue })(CustomEntity.prototype, name);
    });

    // ---- Esta parte es clave ----
    // Forzamos que .name de la clase sea igual al entityName
    // para que Nest devuelva "UserRepository" en vez de "DynamicTypeOrmEntityRepository"
    Object.defineProperty(CustomEntity, 'name', {
        value: entityName,
        writable: false,
    });

    return CustomEntity as new (partial?: Partial<T>) => T;
}
