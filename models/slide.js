'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slide.belongsTo(models.Organization, {
        as: 'organization',
        foreignKey: 'id',
        sourceKey: 'organizationId',
      })
    }
  };
  Slide.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    organizationId: {
      type: DataTypes.INTEGER
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Slide',
    timestamps: true,
    paranoid: true
  });
  return Slide;
};