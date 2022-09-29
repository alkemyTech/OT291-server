'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
    }
  };
  Contact.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.STRING
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Contact',
    paranoid: true,
    timestamps: true,
  });
  return Contact;
};