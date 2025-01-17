import { Module } from '@nestjs/common';
import { TypeOrmModule } from './orm/typeorm/typeorm.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'oroverde.sqlite',
            autoLoadEntities: true, // Asegura que todas las entidades registradas sean cargadas
            synchronize: true, // Sincroniza automáticamente las tablas
        }),
    ],
})
export class DatabaseModule { }
