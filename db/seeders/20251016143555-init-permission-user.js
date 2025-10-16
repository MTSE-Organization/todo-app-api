'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'db_group_permission',
      [
        {
          group_id: 3,
          permission_id: '2782505886013198336'
        },
        {
          group_id: 3,
          permission_id: '2782506015885627392'
        },
        {
          group_id: 3,
          permission_id: '2782506053361733632'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('db_group_permission', null, {});
  }
};
