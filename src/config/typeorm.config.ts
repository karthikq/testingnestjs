import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: 'test',
      host: 'localhost',
      port: 5432,
      entities: ['**/*.entity.ts'],
      url: '',
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}
