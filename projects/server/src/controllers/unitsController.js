const { addStock, updateStock, recalculateStock } = require("../helpers/units");
const db = require("../models");
const conversion_unit = db.conversion_unit;
const default_unit = db.default_unit;
const stock = db.stock;
const product_unit = db.product_unit;
module.exports = {
	addDefaultUnit: async (req, res) => {
		try {
			const { unit } = req.body;
			let isExist = await default_unit.findOne({
				where: {
					unit_name: unit,
				},
			});
			if (!isExist) {
				await default_unit.create({ unit_name: unit });
				return res
					.status(200)
					.json({ message: "insert default unit successfully" });
			} else {
				return res.status(400).json({ message: "Default unit already axists" });
			}
		} catch (error) {
			res.status(500).json({ status: "failed", message: error });
		}
	},
	updateDefaultUnit: async (req, res) => {
		try {
			const { unit } = req.body;
			let [data] = await default_unit.update(
				{ unit_name: unit },
				{
					where: {
						id: req.params.id,
					},
				}
			);
			console.log(data);
			if (data === 1) {
				return res
					.status(200)
					.json({ message: "Update default unit successfully" });
			} else {
				return res.status(400).json({ message: "Update default unit failed" });
			}
		} catch (error) {
			res.status(500).json({ status: "failed", message: error });
		}
	},
	addConversionUnit: async (req, res) => {
		try {
			const { unit } = req.body;
			let isExist = await conversion_unit.findOne({
				where: {
					unit_name: unit,
				},
			});

			if (!isExist) {
				await conversion_unit.create({ unit_name: unit });
				return res
					.status(200)
					.json({ message: "insert conversion unit successfully" });
			} else {
				return res
					.status(400)
					.json({ message: "Conversion unit already axists" });
			}
		} catch (error) {
			res.status(500).json({ status: "failed", message: error });
		}
	},
	updateConversionUnit: async (req, res) => {
		try {
			console.log(req.body);
			console.log(req.params.id);
			const { unit } = req.body;
			let [data] = await conversion_unit.update(
				{ unit_name: unit },
				{
					where: {
						id: req.params.id,
					},
				}
			);
			console.log(data);
			if (data === 1) {
				return res
					.status(200)
					.json({ message: "Update conversion unit successfully" });
			} else {
				return res
					.status(400)
					.json({ message: "Update conversion unit failed" });
			}
		} catch (error) {
			res.status(500).json({ status: "failed", message: error });
		}
	},

	getDefaultUnit: async (req, res) => {
		try {
			const data = await default_unit.findAll();
			if (data.length > 0) {
				return res.status(200).json({ status: "success", data });
			} else {
				return res.status(400).json({ status: "failed", data: {} });
			}
		} catch (error) {
			return res.status(500).json({ status: "failed", message: error });
		}
	},
	getConversionUnit: async (req, res) => {
		try {
			const data = await conversion_unit.findAll();
			if (data.length > 0) {
				return res.status(200).json({ status: "success", data });
			} else {
				return res
					.status(400)
					.json({ status: "failed", message: "data not found", data: {} });
			}
		} catch (error) {
			return res.status(500).json({ status: "failed", message: error });
		}
	},
	getDefaultUnitById: async (req, res) => {
		try {
			const data = await default_unit.findOne({
				where: {
					id: req.params.id,
				},
			});
			const { dataValues } = data;
			if (data.dataValues) {
				return res.status(200).json({ status: "success", dataValues });
			} else {
				return res.status(400).json({ status: "failed", data: {} });
			}
		} catch (error) {
			return res.status(500).json({ status: "failed", message: error });
		}
	},
	getConversionUnitById: async (req, res) => {
		try {
			const data = await conversion_unit.findOne({
				where: {
					id: req.params.id,
				},
			});
			const { dataValues } = data;
			if (data.dataValues) {
				return res.status(200).json({ status: "success", dataValues });
			} else {
				return res
					.status(400)
					.json({ status: "failed", message: "data not found", data: {} });
			}
		} catch (error) {
			return res.status(500).json({ status: "failed", message: error });
		}
	},
	addProductUnit: async (req, res) => {
		const {
			default_unit_qty,
			default_unit_id,
			conversion_unit_qty,
			conversion_unit_id,
		} = req.body;
		const product_id = req.params.id;
		try {
			const isExist = await product_unit.findOne({
				where: {
					product_id: product_id,
				},
			});
			if (!isExist) {
				await product_unit.create({
					product_id,
					default_unit_qty,
					default_unit_id,
					conversion_unit_qty,
					conversion_unit_id,
				});

				await stock.create(
					{
						product_id,
						default_unit_qty,
						default_unit_id,
						conversion_unit_qty,
						conversion_unit_id,
						qty: default_unit_qty,
					},
				);

				return res
					.status(200)
					.json({
						status: "success",
						message: "add product unit successfully",
					});
			} else {
				const recalculate = await recalculateStock(
					product_id,
					conversion_unit_qty
				);
				if (recalculate) {
					await product_unit.update(
						{
							default_unit_qty: default_unit_qty,
							default_unit_id: default_unit_id,
							conversion_unit_qty: conversion_unit_qty,
							conversion_unit_id: conversion_unit_id,
						},
						{ where: { product_id: product_id } }
					);

					return res
						.status(200)
						.json({
							status: "success",
							message: "add product unit successfully",
						});
				}
			}
		} catch (error) {
			return res.status(500).json({ status: "failed", message: error });
		}
	},
	getProductUnitById: async (req, res) => {
		try {
			const data = await product_unit.findOne({
				where: {
					product_id: req.params.id,
				},
			});
			const { dataValues } = data;
			return res.status(200).json({ status: "success", dataValues });
		} catch (error) {
			return res.status(500).json({ status: "failed", message: error });
		}
	},

	test: async (req, res) => {
		try {
			let result = await product_unit.findOne({
				where: {
					id: req.params.id,
				},
			});

			if (result) {
				res.json({
					message: "ok",
				});
			} else {
				res.json({
					message: "none",
				});
			}
		} catch (error) {
			res.json({
				message: "failed",
			});
		}
	},
};
