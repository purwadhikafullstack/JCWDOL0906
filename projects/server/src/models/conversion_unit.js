"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class conversion_unit extends Model {
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
    conversion_unit.init(
        {
            unit_name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "conversion_unit",
        }
    );
    return conversion_unit;
};
