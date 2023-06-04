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
            // define association here
            Product_Details.hasOne(models.Product, {
                foreignKey: {
                    name: "product_id",
                },
            });
            Product.hasMany(models.Category, {
                foreignKey: {
                    name: "category_id",
                }
            });
            Product.hasMany(models.Discount, {
                foreignKey: {
                    name: "product_id",
                }
            });
            Product.hasMany(models.Transaction_Detail, {
                foreignKey: {
                    name: "product_id",
                }
            });
            Product.hasMany(models.Stock, {
                foreignKey: {
                    name: "product_id"
                }
            });
            
        }
    }
    Product_Details.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "username",
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "email",
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8],
                },
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "phone_number",
            },
            is_verified: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            verification_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return Product_Details;
};
