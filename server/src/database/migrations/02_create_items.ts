import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
        .createTableIfNotExists('items', table => {
            
        table.increments('id')  
            .primary()
            .notNullable();

        table.string('title', 20)
            .notNullable();
        
        table.string('icon', 50)
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('items');
}