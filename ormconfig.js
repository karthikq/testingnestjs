var dbConfig = {
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'postgres',
      database: 'test',
      host: 'localhost',
      port: 5432,
      entities: ['**/*.entity.js'],
    });
    break;
  case 'production':

  default:
    throw new Error('unkown env');
}

module.exports = dbConfig;
