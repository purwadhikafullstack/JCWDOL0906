"use strict";
const { Model } = require("sequelize");
const category = require("./category");
module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Discount.belongsTo(models.product, {
            //     foreignKey: {
            //         name: "product_id",
            //     },
            // });
        }
    }
    Discount.init(
        {
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            discount_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "discount_name",
            },
            value: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            is_deleted: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Discount",
        }
    );
    return Discount;
};
