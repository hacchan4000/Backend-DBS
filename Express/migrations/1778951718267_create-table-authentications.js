/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 * npm run migrate up 
 */
export const up = (pgm) => {
  pgm.createTable('authentications', {
    id:{ type: 'VARCHAR(50)', primaryKey: true,},
    user_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'users(id)', onDelete: 'CASCADE',},
    token:{  type: 'TEXT', notNull: true },
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('authentications');
};
