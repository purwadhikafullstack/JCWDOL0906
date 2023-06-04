"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Default_Unit extends Model {
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
    Default_Unit.init(
        {
            unit_name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "default_unit",
        }
    );
    return Dafault_Unit;
};
