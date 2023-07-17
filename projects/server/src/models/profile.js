"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static asscociate(models) {
    //   Profile.belongsTo(models.User, {
    //     foreignKey: {
    //       name: "user_id",
    //     },
    //   });
    // }
  }
  Profile.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
