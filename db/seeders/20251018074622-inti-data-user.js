'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'db_account',
      [
        {
          id: 2,
          email: 'user@gmail.com',
          password:
            '$2b$10$zN9D1Ax1VNKOJbHviwWWg.HFPXAPC6CZkv27XanL/pRPzaaxBWJ.q',
          full_name: 'User Test',
          avatar_path: null,
          phone: null,
          kind: 2,
          is_super_admin: 0,
          group_id: 3,
          created_date: '2025-09-10 04:32:40',
          modified_date: '2025-09-10 04:32:40',
          status: 1
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'db_account',
      {
        id: 2
      },
      {}
    );
  }
};
