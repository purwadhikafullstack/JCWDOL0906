"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Transaction.belongsTo(models.User, {
            //     foreignKey: "user_id"
            // }
            // );
            // Transaction.hasMany(models.Transaction_Details, {
            //     foreignKey: 'transaction_code'
            // });
        }
    }
    Transaction.init(
        {
            transaction_code: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1
            },
            user_id: {
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
            is_confirmed: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
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
