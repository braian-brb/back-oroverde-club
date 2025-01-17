import { createTypeOrmEntity } from "../orm/typeorm/create-entity";

export type ColumnConfig = {
    name: string;
    type?: 'string' | 'number' | 'boolean';
    unique?: boolean;
    default?: any;
};

export interface BaseEntity {
    id: number;
}

export function createEntity<T extends BaseEntity>(
    orm: 'typeorm' | 'drizzle',
    entityName: string,
    columns: ColumnConfig[],
): { new(partial?: Partial<T>): T } {
    switch (orm) {
        case 'typeorm':
            return createTypeOrmEntity<T>(entityName, columns);
        case 'drizzle':
            throw new Error('Drizzle ORM is not implemented yet.');
        default:
            throw new Error(`ORM ${orm} is not supported.`);
    }
}
