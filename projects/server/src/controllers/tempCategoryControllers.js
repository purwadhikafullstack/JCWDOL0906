// //import model
// const db = require('../models')
// const category = db.Category;

// module.exports = {
//     //add a category
//     addCategory: async (req, res) => {
//         let { category } = req.body;
//         try {
//             const isExist = category.findOne({
//                 category_name: category,
//             });

//             if (!isExist) {
//                 await category.create(req.body)
//                 return res.status(200).send({ message: 'Add category sucessfully' });
//             } else {
//                 return res.status(400).send({ error: 'Failed to add category' });
//             }
//         } catch (error) {
//             res.status(400).send({ error: 'Failed to add category' });
//         }
//     },
//     // update a category
//     updateCategory: async (req, res) => {
//         console.log(req.body)
//         try {
//             let isExist = await category.findOne({
//                 where: {
//                     category_id: req.params.id
//                 }
//             })
//         } catch (error) {

//         }
//     },
//     deleteCategory: async (req, res) => {
//         try {
//             const { categoryId } = req.params;

//             const deleteCategory = await Category.findByIdAndRemove(categoryId);

//             if (!deleteCategory) {
//                 return res.status(404).send({ error: 'Category not found' });
//             }
//             res.status(200).send({ message: 'Category deleted successfully' });
//         } catch (error) {
//             res.status(500).send({ error: 'Failed to delete category' });
//         }
//     },
//     getCategory: async (req, res) => {
//         try {
//             const data = await category.findAll()
//             if (data.length > 0) {
//                 return res.status(200).json({ success: true, message: '', data })
//             } else {
//                 return res.status(404).json({ success: false, message: 'Data Not found', data: '' })
//             }
//         } catch (error) {
//             return res.status(500).json({ status: 'failed', message: error })
//         }
//     }

// };