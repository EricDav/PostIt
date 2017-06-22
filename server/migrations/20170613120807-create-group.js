module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      Description: {
        type: Sequelize.STRING,
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
      ownerUserName: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        reference: {
          model: 'PostIt',
          key: 'userName',
          as: 'ownerUserName',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('groups'),
};
