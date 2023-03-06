import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('TB_PRODUCT', table => {
		table.increments('ID_PRODUCT').notNullable().primary();
		table.string('NAME').notNullable();
		table.string('DESCRIPTION').notNullable();
		table.string('CODE_PRODUCT').notNullable();
		table.integer('UNITARY_VALUE').notNullable();
		table.integer('STOCK_QUANTITY').notNullable();
		table.integer('ID_CATEGORY').notNullable()
		table.dateTime('DT_CREATION').notNullable();
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('TB_PRODUCT')
}

