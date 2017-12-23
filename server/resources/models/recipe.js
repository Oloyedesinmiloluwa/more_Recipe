module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    upvotes: {
      type: DataTypes.INTEGER,
    },
    downvotes: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    ingredient: DataTypes.ARRAY(DataTypes.STRING),
    review: DataTypes.ARRAY(DataTypes.STRING),
  });

  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    // Recipe.belongsTo(models.Category, {
    //   foreignKey: 'categoryId',
    //   onDelete: 'CASCADE',
    // });
  };
  return Recipe;
};
