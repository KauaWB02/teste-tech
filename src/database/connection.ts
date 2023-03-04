import knex from 'knex';
import { database as db } from '../config/app';

export const connection = knex({
    client: 'mysql',
    connection: {
        host: db.host,
        port: 3306,
        database: db.database,
        user: db.username,
        password: db.password
    },

});

