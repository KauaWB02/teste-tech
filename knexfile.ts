import type { Knex } from 'knex';
import { database as db } from './src/config/app';
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {

  development: {
    client: 'mysql',
    connection: {
      host: db.host,
      port: 3306,
      database: db.database,
      user: db.username,
      password: db.password
    },
    migrations: {
      directory: 'src/database/migrations'
    }
  }

};

module.exports = config;
