'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activities.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      content:DataTypes.TEXT,
      image:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Activities',
      timestamps: true,
      paranoid: true,
    }
  );
  return Activities;
};
