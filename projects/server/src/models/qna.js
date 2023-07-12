"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class QnA extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            QnA.belongsTo(models.User, {
                foreignKey: {
                    name: "user_id",
                },
            });
        }
    }
    QnA.init(
        {
            useer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            admin_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "question",
            },
            answer: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "answer",
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
            modelName: "QnA",
        }
    );
    return QnA;
};
