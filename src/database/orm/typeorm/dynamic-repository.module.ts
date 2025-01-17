import { Module, DynamicModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmRepository } from './typeorm.repository';
import { BaseEntity } from '../../abstractions/entity-factory';

@Module({})
export class DynamicRepositoryModule {
    static forEntity<T extends BaseEntity>(entity: new () => T): DynamicModule {
        const repositoryToken = getRepositoryToken(entity); // Token interno de TypeORM
        const dynamicToken = `${entity.name}CustomRepository`; // Token personalizado

        console.log(`[DynamicRepositoryModule] Registrando entidad: ${entity.name}`);
        console.log(`[DynamicRepositoryModule] Token TypeORM: ${repositoryToken}`);
        console.log(`[DynamicRepositoryModule] Token dinámico: ${dynamicToken}`);

        const providers: Provider[] = [
            {
                provide: dynamicToken, // Cambiamos el token dinámico
                useFactory: (repository: Repository<T>) => {
                    console.log(`[DynamicRepositoryModule] Creando repositorio dinámico para: ${dynamicToken}`);
                    return new TypeOrmRepository<T>(repository);
                },
                inject: [repositoryToken], // Usamos el token de TypeORM para inyectar el repositorio base
            },
        ];

        return {
            module: DynamicRepositoryModule,
            imports: [TypeOrmModule.forFeature([entity])], // Registramos la entidad en TypeORM
            providers,
            exports: providers, // Exportamos el nuevo token dinámico
        };
    }
}
