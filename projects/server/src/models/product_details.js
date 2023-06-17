"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product_Details.hasOne(models.Product, {
        foreignKey: {
          name: "product_id",
        },
      });
    }
  }
  Product_Details.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      indication: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dose: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rules: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product_Details",
    }
  );
  return Product_Details;
};
