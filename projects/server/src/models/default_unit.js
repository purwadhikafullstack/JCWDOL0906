"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class dafault_unit extends Model {
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
    dafault_unit.init(
        {
            unit_name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "dafault_unit",
        }
    );
    return dafault_unit;
};
