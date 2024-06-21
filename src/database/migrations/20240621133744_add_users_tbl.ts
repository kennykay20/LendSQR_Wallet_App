import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('full_name');
    table.string('username');
    table.string('email').unique().index().notNullable();
    table.string('password_hash').notNullable();
    table.string('address').defaultTo('');
    table.boolean('is_active').defaultTo(false);
    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('deleted_at').nullable();
    table.timestamps(true, true); // Adds created_at and updated_at columns
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

