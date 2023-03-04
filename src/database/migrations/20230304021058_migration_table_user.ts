import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('TB_USER', table => {
        table.increments('ID_USER').notNullable().primary();
        table.string('NAME').notNullable();
        table.string('EMAIL').notNullable();
        table.string('CPF').notNullable();
        table.string('PASSWORD').notNullable();
        table.string('PHONE');
        table.dateTime('DT_CREATION').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('TB_USER')
}

