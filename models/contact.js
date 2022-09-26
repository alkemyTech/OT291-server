'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contact.init({
    name: {
      allowNull:false,
      type:DataTypes.STRING},
    phone: {
      allowNull:false,
      type:DataTypes.INTEGER},
    email: {
      allowNull:false,
      type:DataTypes.STRING},
    message: {
      allowNull:false,
      type:DataTypes.STRING},
    deletedAt: {
      type:DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'Contact',
    paranoid: true,
    timestamps: true,
  });
  return Contact;
};