module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      views: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      upvotes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      downvotes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      categoryid: {
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};