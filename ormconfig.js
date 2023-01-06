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
      url: 'postgres://cdiiyvhh:4PmPCoFI7s-9XMDUXMEQyeNQj1btoIHt@snuffleupagus.db.elephantsql.com/cdiiyvhh',
    });
    break;
  case 'production':

  default:
    throw new Error('unkown env');
}

module.exports = dbConfig;
