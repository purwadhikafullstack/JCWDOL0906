//import model
// const { error } = require('console');
const db = require("../models");
const category = db.Category;

module.exports = {
	addCategory: async (req, res) => {
		const data = JSON.parse(req.body.data);
		const { category_name, createdBy } = data;

		const image = req.file.path;
		try {
			let isExist = await category.findOne({
				where: {
					category_name: category_name,
				},
			});

			if (!isExist) {
				await category.create({
					category_name,
					createdBy,
					image,
				});
				res.status(200).send({
					message: "Category created successfully",
				});
			} else {
				return res.status(400).send({ message: "Product already exists! " });
			}
		} catch (err) {
			console.log(err);
			res.status(400).send({
				message: "Error created category",
			});
		}
	},
	// get all category
	getAllCategory: async (req, res) => {
		try {
			console.log("masukkesinigak");
			const page = parseInt(req.query.page) || 1;
			const pageSize = parseInt(req.query.size) || 5;
			console.log(req.query.size);
			const result = await category.findAndCountAll({
				where: {
					is_deleted: false,
				},
				limit: pageSize,
				offset: (page - 1) * pageSize,
			});
			console.log(result);
			// const data = await category.findAll({
			//     where: {
			//         is_deleted: false,
			//     }
			// });
			res.status(200).send({
				data: result.rows,
				count: result.count,
				message: " Get All category succesfully",
			});
		} catch (error) {
			console.log(error);
			res.status(400).send({ error: "Failed to get all category" });
		}
	},
	// update a category
	updateCategory: async (req, res) => {
		const data = JSON.parse(req.body.data);
		const { category_name, updatedBy } = data;

		try {
			await category.update(
				{
					category_name,
					image: req.file.path,
					updatedBy,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			res.status(200).send({
				status: true,
				message: "Category Successfully Updated",
			});
		} catch (error) {
			console.log(error);
			res.status(400).send({
				status: false,
				message: error.message,
			});
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const { id } = req.params;
			console.log(id);
			const deleteCategory = await category.update(
				{
					is_deleted: true,
				},
				{
					where: { id: id },
				}
			);
			res
				.status(200)
				.send({ deleteCategory, message: "Category deleted successfully" });
		} catch (error) {
			res.status(400).send({ error: "Failed to delete category" });
			console.log(error);
		}
	},
};
