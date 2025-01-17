export abstract class AbstractRepository<T> {
    abstract create(data: Partial<T>): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract findOne(id: number): Promise<T | null>;
    abstract update(id: number, data: Partial<T>): Promise<T | null>;
    abstract delete(id: number): Promise<void>;
}
