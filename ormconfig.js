require('dotenv').config();

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

module.exports = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  migrationsTableName: 'migration',
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: ['error'],
};
