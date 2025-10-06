/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'db_permission',
      [
        {
          id: '2782495617564282880',
          name: 'Create Group',
          description: 'Create Group',
          p_code: 'GR_C',
          permission_group_id: '2782475784671989760',
          created_date: '2025-09-10 05:24:11',
          modified_date: '2025-09-10 05:24:11',
          status: 1
        },
        {
          id: '2782496130515079168',
          name: 'Update Group',
          description: 'Update Group',
          p_code: 'GR_U',
          permission_group_id: '2782475784671989760',
          created_date: '2025-09-10 05:26:13',
          modified_date: '2025-09-10 05:26:13',
          status: 1
        },
        {
          id: '2782496161561317376',
          name: 'Delete Group',
          description: 'Delete Group',
          p_code: 'GR_D',
          permission_group_id: '2782475784671989760',
          created_date: '2025-09-10 05:26:21',
          modified_date: '2025-09-10 05:26:21',
          status: 1
        },
        {
          id: '2782496194541129728',
          name: 'Get Group',
          description: 'Get Group',
          p_code: 'GR_V',
          permission_group_id: '2782475784671989760',
          created_date: '2025-09-10 05:26:29',
          modified_date: '2025-09-10 05:26:29',
          status: 1
        },
        {
          id: '2782496226233290752',
          name: 'List Group',
          description: 'List Group',
          p_code: 'GR_L',
          permission_group_id: '2782475784671989760',
          created_date: '2025-09-10 05:26:36',
          modified_date: '2025-09-10 05:26:36',
          status: 1
        },
        {
          id: '2782496725045088256',
          name: 'Create Permission',
          description: 'Create Permission',
          p_code: 'PER_C',
          permission_group_id: '2782475927232188416',
          created_date: '2025-09-10 05:28:35',
          modified_date: '2025-09-10 05:28:35',
          status: 1
        },
        {
          id: '2782496772973400064',
          name: 'Update Permission',
          description: 'Update Permission',
          p_code: 'PER_U',
          permission_group_id: '2782475927232188416',
          created_date: '2025-09-10 05:28:46',
          modified_date: '2025-09-10 05:28:46',
          status: 1
        },
        {
          id: '2782496803889614848',
          name: 'Delete Permission',
          description: 'Delete Permission',
          p_code: 'PER_D',
          permission_group_id: '2782475927232188416',
          created_date: '2025-09-10 05:28:54',
          modified_date: '2025-09-10 05:28:54',
          status: 1
        },
        {
          id: '2782496837578264576',
          name: 'Get Permission',
          description: 'Get Permission',
          p_code: 'PER_V',
          permission_group_id: '2782475927232188416',
          created_date: '2025-09-10 05:29:02',
          modified_date: '2025-09-10 05:29:02',
          status: 1
        },
        {
          id: '2782496866799980544',
          name: 'List Permission',
          description: 'List Permission',
          p_code: 'PER_L',
          permission_group_id: '2782475927232188416',
          created_date: '2025-09-10 05:29:09',
          modified_date: '2025-09-10 05:29:09',
          status: 1
        },
        {
          id: '2782497103312588800',
          name: 'Create Permission Group',
          description: 'Create Permission Group',
          p_code: 'PER_GR_C',
          permission_group_id: '2782475962514673664',
          created_date: '2025-09-10 05:30:05',
          modified_date: '2025-09-10 05:30:05',
          status: 1
        },
        {
          id: '2782497140448956416',
          name: 'Update Permission Group',
          description: 'Update Permission Group',
          p_code: 'PER_GR_U',
          permission_group_id: '2782475962514673664',
          created_date: '2025-09-10 05:30:14',
          modified_date: '2025-09-10 05:30:14',
          status: 1
        },
        {
          id: '2782497176163454976',
          name: 'Delete Permission Group',
          description: 'Delete Permission Group',
          p_code: 'PER_GR_D',
          permission_group_id: '2782475962514673664',
          created_date: '2025-09-10 05:30:23',
          modified_date: '2025-09-10 05:30:23',
          status: 1
        },
        {
          id: '2782497205804601344',
          name: 'Get Permission Group',
          description: 'Get Permission Group',
          p_code: 'PER_GR_V',
          permission_group_id: '2782475962514673664',
          created_date: '2025-09-10 05:30:30',
          modified_date: '2025-09-10 05:30:30',
          status: 1
        },
        {
          id: '2782497267804803072',
          name: 'List Permission Group',
          description: 'List Permission Group',
          p_code: 'PER_GR_L',
          permission_group_id: '2782475962514673664',
          created_date: '2025-09-10 05:30:44',
          modified_date: '2025-09-10 05:30:44',
          status: 1
        },
        {
          id: '2782497617005776896',
          name: 'Delete Account',
          description: 'Delete Account',
          p_code: 'ACC_D',
          permission_group_id: '2782476019670454272',
          created_date: '2025-09-10 05:32:08',
          modified_date: '2025-09-10 05:32:08',
          status: 1
        },
        {
          id: '2782505624649338880',
          name: 'List Account',
          description: 'List Account',
          p_code: 'ACC_L',
          permission_group_id: '2782476019670454272',
          created_date: '2025-09-10 06:03:57',
          modified_date: '2025-09-10 06:03:57',
          status: 1
        },
        {
          id: '2782505744547713024',
          name: 'Upload',
          description: 'Upload',
          p_code: 'FILE_U',
          permission_group_id: '2782476058631344128',
          created_date: '2025-09-10 06:04:25',
          modified_date: '2025-09-10 06:04:25',
          status: 1
        },
        {
          id: '2782505886013198336',
          name: 'Create Todos',
          description: 'Create Todos',
          p_code: 'TODO_C',
          permission_group_id: '2782476110749765632',
          created_date: '2025-09-10 06:04:59',
          modified_date: '2025-09-10 06:04:59',
          status: 1
        },
        {
          id: '2782505935606648832',
          name: 'List Todos',
          description: 'List Todos',
          p_code: 'TODO_L',
          permission_group_id: '2782476110749765632',
          created_date: '2025-09-10 06:05:11',
          modified_date: '2025-09-10 06:05:11',
          status: 1
        },
        {
          id: '2782505976694050816',
          name: 'Get Todos',
          description: 'Get Todos',
          p_code: 'TODOS_V',
          permission_group_id: '2782476110749765632',
          created_date: '2025-09-10 06:05:21',
          modified_date: '2025-09-10 06:05:21',
          status: 1
        },
        {
          id: '2782506015885627392',
          name: 'Update Todos',
          description: 'Update Todos',
          p_code: 'TODO_U',
          permission_group_id: '2782476110749765632',
          created_date: '2025-09-10 06:05:30',
          modified_date: '2025-09-10 06:05:30',
          status: 1
        },
        {
          id: '2782506053361733632',
          name: 'Delete Todos',
          description: 'Delete Todos',
          p_code: 'TODO_D',
          permission_group_id: '2782476110749765632',
          created_date: '2025-09-10 06:05:39',
          modified_date: '2025-09-10 06:05:39',
          status: 1
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('db_permission', null, {});
  }
};
