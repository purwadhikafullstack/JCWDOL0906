"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TransactionDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Transaction_Details.hasOne(models.Transaction, {
            //     foreignKey: {
            //         name: "transaction_id",
            //     },
            // });
            // Transaction_Details.hasMany(models.Product, {
            //     foreignKey: {
            //         name: "product_id",
            //     },
            // });
            TransactionDetails.belongsTo(models.Transaction, {
                foreignKey: 'transaction_code'
            })

        }
    }
    TransactionDetails.init(
        {
            transaction_code: {
                type: DataTypes.UUID,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            product_status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            unit: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "transaction_details",
        }
    );
    return TransactionDetails;
};
