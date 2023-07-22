"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class stock extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static asscociate(models) {

            stock.hasMany(models.product, {
                foreignKey: 'product_id'
            })

            stock.belongsTo(models.product, {
                foreignKey: 'product_id'
            })


        }
    }
    stock.init(
        {
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }, default_unit_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }, default_unit_qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }, conversion_unit_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }, conversion_unit_qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }, qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }

        },
        {
            sequelize,
            modelName: "stock",
        }
    );
    return stock;
};
