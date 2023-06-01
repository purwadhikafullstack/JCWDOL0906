"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.User, {
                foreignKey: {
                    name: "user_id",
                },
            });
            // User.hasMany(models.Post, {
            //     foreignKey: {
            //         name: "user_id",
            //     },
            // });
            // User.hasOne(models.Like, {
            //     foreignKey: {
            //         name: "user_id",
            //     },
            // });
            // User.hasOne(models.Comment, {
            //     foreignKey: {
            //         name: "user_id",
            //     },
            // });
        }
    }
    User.init(
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
                type: DataTypes.BOOLEAN,
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
    return User;
};
