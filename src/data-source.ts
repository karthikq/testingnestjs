import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  database: 'test',
  entities: ['**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  url: 'postgres://cdiiyvhh:4PmPCoFI7s-9XMDUXMEQyeNQj1btoIHt@snuffleupagus.db.elephantsql.com/cdiiyvhh',
} as DataSourceOptions);
