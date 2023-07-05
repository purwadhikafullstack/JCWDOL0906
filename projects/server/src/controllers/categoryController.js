//import model
// const { error } = require('console');
const db = require('../models');
const category = db.Category;

module.exports = {
    addCategory: async (req, res) => {
        try {
            // upload image menggunakan multer
            upload(req, res, async (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        message: "Error uploading image",
                    });
                }

                const { category_name, image, createdBy } = req.body;
                await category.create({
                    category_name,
                    image,
                    // image: req.file.filename,
                    createdBy,
                });

                res.status(200).send({
                    message: "Category created successfully"
                });
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Error created category"
            });
        }
    },
    // get all category 
    getAllCategory: async(req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.size) || 5;
            const result = await category.findAndCountAll({
                where: {
                    is_deleted: false,
                },
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            // const data = await category.findAll({
            //     where: {
            //         is_deleted: false,
            //     }
            // });
            res.status(200).send({
                data: result.rows, 
                count: result.count,
                message: ' Get All category succesfully'
            })
        } catch (error) {
            res.status(400).send({error: 'Failed to get all category'});
        }
    },
    // update a category
    updateCategory: async (req, res) => {
        try {
            await category.update(
                {
                    name: req.body.name,
                    category_name,
                    updateBy,
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
            res.status(400).send({
                status: false,
                message: error.message,
            });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const  {id}  = req.params;
            console.log(id);
            const deleteCategory = await category.update(
                {
                    is_deleted: true,
                },
            {
                where: {id: id},
            }
            );
            res.status(200).send({deleteCategory,message: 'Category deleted successfully'});
        } catch (error) {
            res.status(400).send({error: 'Failed to delete category'});
            console.log(error)
        }
    },
};