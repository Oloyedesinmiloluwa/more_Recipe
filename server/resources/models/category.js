module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'category already exists'
      },
    },
    recipeCatalog: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      unique: {
        args: true,
        msg: 'recipe already added'
      },
    },
    image: DataTypes.STRING,
  });
  Category.associate = (models) => {
  };
  return Category;
};
