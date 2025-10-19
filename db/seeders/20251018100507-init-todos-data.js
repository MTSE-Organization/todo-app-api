'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'db_todo',
      [
        {
          id: 1,
          title: 'Buy Milk 1',
          description: 'Get from store',
          due_date: '2030-01-01 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-01 05:00:00',
          modified_date: '2029-12-02 05:00:00'
        },
        {
          id: 2,
          title: 'Buy Milk 2',
          description: 'Get from store',
          due_date: '2030-01-02 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-02 05:00:00',
          modified_date: '2029-12-03 05:00:00'
        },
        {
          id: 3,
          title: 'Buy Milk 3',
          description: 'Get from store',
          due_date: '2030-01-03 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-03 05:00:00',
          modified_date: '2029-12-04 05:00:00'
        },
        {
          id: 4,
          title: 'Buy Milk 4',
          description: 'Get from store',
          due_date: '2030-01-04 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-04 05:00:00',
          modified_date: '2029-12-05 05:00:00'
        },
        {
          id: 5,
          title: 'Buy Milk 5',
          description: 'Get from store',
          due_date: '2030-01-05 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-05 05:00:00',
          modified_date: '2029-12-06 05:00:00'
        },
        {
          id: 6,
          title: 'Buy Milk 6',
          description: 'Get from store',
          due_date: '2030-01-06 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-06 05:00:00',
          modified_date: '2029-12-07 05:00:00'
        },
        {
          id: 7,
          title: 'Buy Milk 7',
          description: 'Get from store',
          due_date: '2030-01-07 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-07 05:00:00',
          modified_date: '2029-12-08 05:00:00'
        },
        {
          id: 8,
          title: 'Buy Milk 8',
          description: 'Get from store',
          due_date: '2030-01-08 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-08 05:00:00',
          modified_date: '2029-12-09 05:00:00'
        },
        {
          id: 9,
          title: 'Buy Milk 9',
          description: 'Get from store',
          due_date: '2030-01-09 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-09 05:00:00',
          modified_date: '2029-12-10 05:00:00'
        },
        {
          id: 10,
          title: 'Buy Milk 10',
          description: 'Get from store',
          due_date: '2030-01-10 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-10 05:00:00',
          modified_date: '2029-12-11 05:00:00'
        },
        {
          id: 11,
          title: 'Buy Milk 11',
          description: 'Get from store',
          due_date: '2030-01-11 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-11 05:00:00',
          modified_date: '2029-12-12 05:00:00'
        },
        {
          id: 12,
          title: 'Buy Milk 12',
          description: 'Get from store',
          due_date: '2030-01-12 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-12 05:00:00',
          modified_date: '2029-12-13 05:00:00'
        },
        {
          id: 13,
          title: 'Buy Milk 13',
          description: 'Get from store',
          due_date: '2030-01-13 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-13 05:00:00',
          modified_date: '2029-12-14 05:00:00'
        },
        {
          id: 14,
          title: 'Buy Milk 14',
          description: 'Get from store',
          due_date: '2030-01-14 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-14 05:00:00',
          modified_date: '2029-12-15 05:00:00'
        },
        {
          id: 15,
          title: 'Buy Milk 15',
          description: 'Get from store',
          due_date: '2030-01-15 00:00:00',
          status: 1,
          account_id: 1,
          created_date: '2029-12-15 05:00:00',
          modified_date: '2029-12-16 05:00:00'
        },
        {
          id: 16,
          title: 'Buy Milk 16',
          description: 'Get from store',
          due_date: '2030-01-16 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-16 05:00:00',
          modified_date: '2029-12-17 05:00:00'
        },
        {
          id: 17,
          title: 'Buy Milk 17',
          description: 'Get from store',
          due_date: '2030-01-17 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-17 05:00:00',
          modified_date: '2029-12-18 05:00:00'
        },
        {
          id: 18,
          title: 'Buy Milk 18',
          description: 'Get from store',
          due_date: '2030-01-18 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-18 05:00:00',
          modified_date: '2029-12-19 05:00:00'
        },
        {
          id: 19,
          title: 'Buy Milk 19',
          description: 'Get from store',
          due_date: '2030-01-19 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-19 05:00:00',
          modified_date: '2029-12-20 05:00:00'
        },
        {
          id: 20,
          title: 'Buy Milk 20',
          description: 'Get from store',
          due_date: '2030-01-20 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-20 05:00:00',
          modified_date: '2029-12-21 05:00:00'
        },
        {
          id: 21,
          title: 'Buy Milk 21',
          description: 'Get from store',
          due_date: '2030-01-21 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-21 05:00:00',
          modified_date: '2029-12-22 05:00:00'
        },
        {
          id: 22,
          title: 'Buy Milk 22',
          description: 'Get from store',
          due_date: '2030-01-22 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-22 05:00:00',
          modified_date: '2029-12-23 05:00:00'
        },
        {
          id: 23,
          title: 'Buy Milk 23',
          description: 'Get from store',
          due_date: '2030-01-23 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-23 05:00:00',
          modified_date: '2029-12-24 05:00:00'
        },
        {
          id: 24,
          title: 'Buy Milk 24',
          description: 'Get from store',
          due_date: '2030-01-24 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-24 05:00:00',
          modified_date: '2029-12-25 05:00:00'
        },
        {
          id: 25,
          title: 'Buy Milk 25',
          description: 'Get from store',
          due_date: '2030-01-25 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-25 05:00:00',
          modified_date: '2029-12-26 05:00:00'
        },
        {
          id: 26,
          title: 'Buy Milk 26',
          description: 'Get from store',
          due_date: '2030-01-26 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-26 05:00:00',
          modified_date: '2029-12-27 05:00:00'
        },
        {
          id: 27,
          title: 'Buy Milk 27',
          description: 'Get from store',
          due_date: '2030-01-27 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-27 05:00:00',
          modified_date: '2029-12-28 05:00:00'
        },
        {
          id: 28,
          title: 'Buy Milk 28',
          description: 'Get from store',
          due_date: '2030-01-28 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-28 05:00:00',
          modified_date: '2029-12-29 05:00:00'
        },
        {
          id: 29,
          title: 'Buy Milk 29',
          description: 'Get from store',
          due_date: '2030-01-29 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-29 05:00:00',
          modified_date: '2029-12-30 05:00:00'
        },
        {
          id: 30,
          title: 'Buy Milk 30',
          description: 'Get from store',
          due_date: '2030-01-30 00:00:00',
          status: 1,
          account_id: 2,
          created_date: '2029-12-30 05:00:00',
          modified_date: '2029-12-31 05:00:00'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('db_todo', null, {});
  }
};
