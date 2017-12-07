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
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    downvotes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    categoryid: {
      type: DataTypes.INTEGER,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: DataTypes.TEXT,
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
