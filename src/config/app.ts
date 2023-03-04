

require('dotenv/config');

export const database = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

export const server = {
    port: process.env.PORT || 3000
}