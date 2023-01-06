import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  database: 'test',
  host: 'localhost',
  port: 5432,
  entities: ['**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  url: '',
  migrationsRun: true,
} as DataSourceOptions);
