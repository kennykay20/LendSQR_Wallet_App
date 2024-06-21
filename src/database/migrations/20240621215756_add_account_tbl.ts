import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('accounts', function(table) {
    table.bigint('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.decimal('balance').defaultTo(0);
    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('deleted_at').nullable();
    table.timestamps(true, true); // Adds created_at and updated_at columns

    // Define foreign key constraint
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('accounts');
}