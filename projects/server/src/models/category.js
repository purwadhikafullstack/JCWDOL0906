"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Category.hasMany(models.Product, {
				foreignKey: "category_id",
			});
		}
	}
	Category.init(
		{
			category_name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: "category_name",
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
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
			modelName: "Category",
		}
	);
	return Category;
};
