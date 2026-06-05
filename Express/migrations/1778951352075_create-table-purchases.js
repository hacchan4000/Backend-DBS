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
  pgm.createTable('purchases', {
    id:{ type: 'VARCHAR(50)', primaryKey: true},
    user_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'users(id)'}, 
    category_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'categories(id)'}, 
    purchase_name:{ type: 'TEXT', notNull: true},
    purchase_date:{ type: 'TEXT', notNull: true},
    price:{ type: 'TEXT', notNull: true},
  
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 * 

 */
export const down = (pgm) => {
  pgm.dropTable('purchases');
};
