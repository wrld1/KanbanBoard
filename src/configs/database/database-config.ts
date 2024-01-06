import { DataSourceOptions, getMetadataArgsStorage } from 'typeorm';
import * as process from 'process';
import path, { extname } from 'path';

export const databaseConfiguration = (
  isMigrationRun = true,
): DataSourceOptions => {
  const env = process.env.APP_ENV;
  const migrationFolder =
    env === 'local'
      ? path.join(__dirname, '../../database/migrations')
      : 'dist/database/migrations';
  const ext = extname(__filename);

  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [
      `**/*.entity${ext}`,
      ...getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    ],
    migrations: [`${migrationFolder}/*${ext}`],
    migrationsTableName: 'migrations',
    migrationsRun: isMigrationRun,
    logging: true,
    synchronize: false,
  };
};
