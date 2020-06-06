import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
        .createTableIfNotExists('adresses', table => {

        table.increments('id')
            .primary().notNullable();

        table.string('street', 100)
            .notNullable();

        table.string('number', 5)
            .nullable();

        table.string('complement', 100)
            .nullable();

        table.string('district', 100)
            .nullable();

        table.string('city', 50)
            .notNullable();

        table.string('uf', 2)
            .notNullable();

        table.string('cep', 9)
            .notNullable();

        table.decimal('latitude')
            .nullable();

        table.decimal('longitude')
            .nullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('adresses');
}