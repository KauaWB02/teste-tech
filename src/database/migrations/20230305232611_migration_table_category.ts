import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('TB_CATEGORY', table => {
		table.increments('ID_CATEGORY').notNullable().primary();
		table.string('NAME').notNullable();
		table.dateTime('DT_CREATION').notNullable();
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('TB_CATEGORY')
}
