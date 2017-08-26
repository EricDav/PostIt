module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Bug: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      recomendation: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      generalRating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rejections: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Feedbacks')
};
