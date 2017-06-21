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
      owner: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'PostIts',
          key: 'userName',
          as: 'owner',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('groups'),
};
