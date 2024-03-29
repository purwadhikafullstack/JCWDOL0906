"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  Address.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_default: {
        type: DataTypes.BOOLEAN,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
