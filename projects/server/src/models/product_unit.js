"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class product_unit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static asscociate(models) {
            // Profile.belongsTo(models.User, {
            //     foreignKey: {
            //         name: "user_id",
            //     },
            // });
        }
    }
    product_unit.init(
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
            }

        },
        {
            sequelize,
            modelName: "product_unit",
            freezeTableName: true
        }
    );
    return product_unit;
};
