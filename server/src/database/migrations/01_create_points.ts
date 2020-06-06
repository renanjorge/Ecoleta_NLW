import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
        .createTableIfNotExists('points', table => {
            
        table.increments('id')
            .primary()
            .notNullable();

        table.string('name', 100)
            .notNullable();

        table.string('image', 100)
            .notNullable();

        table.string('email', 100)
            .nullable();

        table.string('whatsapp', 20)
            .notNullable();

        table.integer('id_address')
            .notNullable()
            .references('id')
            .inTable('adresses');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('points');
}