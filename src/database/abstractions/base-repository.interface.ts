export interface BaseRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T | null>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<void>;
}
