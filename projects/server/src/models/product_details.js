"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class product_details extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Product_Details.hasOne(models.Product, {
            //     foreignKey: {
            //         name: "product_id",
            //     },
            // });

        }
    }
    product_details.init(
        {
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
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
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "product_details",
        }
    );
    return product_details;
};
