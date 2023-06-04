"use strict";
const { Model } = require("sequelize");
const category = require("./category");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Transaction.belongsTo(models.User, {
                foreignKey: {
                    name: "user_id",
                },
            });
            Transaction.hasOne(models.Transaction_Details, {
                foreignKey: {
                    name: "transaction_id",
                },
            });
        }
    }
    Transaction.init(
        {
            useer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            is_deleted: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            is_confrimed: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            payment: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            shipping: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            payment_receipt: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "payment_receipt",
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
            modelName: "Transaction",
        }
    );
    return Transaction;
};