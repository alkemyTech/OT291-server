'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Orders.init(
    {
      category: DataTypes.ENUM('singleDonation', 'recurrentDonation'),
      amount: DataTypes.INTEGER,
      userEmail: DataTypes.STRING,
      paymentLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Orders',
      paranoid: true,
      timestamps: true,
    }
  );
  return Orders;
};
