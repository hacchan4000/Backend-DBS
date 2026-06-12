// profile kandidat
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('subscriptions', {
    id:{ type: 'VARCHAR(50)', primaryKey: true},
    user_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'users(id)'}, 
    title:{ type: 'TEXT', notNull: true},
    subscription_start_date:{ type: 'DATE', notNull: true, default: pgm.func('CURRENT_DATE')},
    subscription_end_date:{ type: 'DATE', notNull: true},
    price:{type: 'NUMERIC(15,2)', notNull: true},  
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 * 

 */
export const down = (pgm) => {
  pgm.dropTable('subscriptions');
};
