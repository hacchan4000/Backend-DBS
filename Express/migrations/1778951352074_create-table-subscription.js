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
  pgm.createTable('subscription', {
    id:{ type: 'VARCHAR(50)', primaryKey: true},
    user_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'users(id)'}, 
    subscription_name:{ type: 'TEXT', notNull: true},
    subscription_start_date:{ type: 'TEXT', notNull: true},
    price:{},  
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 * 

 */
export const down = (pgm) => {
  pgm.dropTable('users');
};
