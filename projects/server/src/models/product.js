"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.hasOne(models.Product_Details, {
      //     foreignKey: {
      //         name: "product_id",
      //     },
      // });
      Product.hasOne(models.Cart, { foreignKey: 'product_id', as: 'Cart' });
      // Product.belongsTo(models.Cart, { foreignKey: 'product_id' });
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
      });



    }
  }
  Product.init(
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "product_name",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "image",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      indication: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dose: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rules: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
