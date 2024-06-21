import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', function(table) {
    table.increments('id');
    table.integer('account_id').unsigned().notNullable();
    table.enu('type', ["fund", "transfer", "withdraw"]).notNullable();
    table.decimal('amount');
    table.integer('recipient_account_id').nullable();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('deleted_at').nullable();
    table.timestamps(true, true); // Adds created_at and updated_at columns

    // Define foreign key constraint
    table.foreign('account_id').references('id').inTable('accounts');
    table.foreign('recipient_account_id').references('id').inTable('accounts');
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('transactions');
}