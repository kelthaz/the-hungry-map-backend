import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/core/domain/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // aseguramos que se carguen las variables de entorno
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: 5432,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [User],
        synchronize: true, // ⚠️ solo en desarrollo
        ssl: {
          rejectUnauthorized: false, // 👈 necesario para la mayoría de proveedores cloud
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
