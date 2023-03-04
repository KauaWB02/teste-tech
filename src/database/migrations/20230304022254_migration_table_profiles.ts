import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('TB_PROFILE', table => {
        table.increments('ID_PROFILE').notNullable().primary();
        table.string('NAME').notNullable();
        table.integer('ID_USER').unsigned()
                                .notNullable()
                                .references('ID_USER')
                                .inTable('TB_USER');
        table.boolean('IS_ADMIN').notNullable();
        table.dateTime('DT_CREATION').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('TB_PROFILE')
}

