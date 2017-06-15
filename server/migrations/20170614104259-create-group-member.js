module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('groupMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      memberUsername: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      groupId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        model: 'group',
        key: 'userName',
        as: 'groupId',
      },
    }),

  down: queryInterface => queryInterface.dropTable('groupMembers'),
};
