import { Module } from '@nestjs/common';
import { TypeOrmModule } from './orm/typeorm/typeorm.module';
// import { UserEntity } from '../modules/users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'oroverde.sqlite',
            autoLoadEntities: true,
            synchronize: true,
        }),
        // TypeOrmModule.forFeature([UserEntity]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
