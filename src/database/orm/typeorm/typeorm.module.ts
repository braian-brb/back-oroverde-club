import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepository } from './typeorm.repository';

@Module({})
export class TypeOrmModule {
    static forRoot(config: any): DynamicModule {
        return {
            module: TypeOrmModule,
            imports: [
                NestTypeOrmModule.forRoot({
                    type: config.type || 'sqlite',
                    database: config.database || 'oroverde.sqlite',
                    autoLoadEntities: config.autoLoadEntities !== false,
                    synchronize: config.synchronize !== false,
                    ...config.extra, // Soporte para configuraciones adicionales
                }),
            ],
            exports: [NestTypeOrmModule],
        };
    }

    static forFeature(entities: any[]): DynamicModule {
        console.log('Entidades registradas:', entities);

        return {
            module: TypeOrmModule,
            imports: [NestTypeOrmModule.forFeature(entities)],
            providers: [TypeOrmRepository],
            exports: [NestTypeOrmModule, TypeOrmRepository],
        };
    }
}
