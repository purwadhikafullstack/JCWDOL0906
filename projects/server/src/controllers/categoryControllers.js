// //import model
// const db = require('../models')
// const category = db.Category;

// module.exports = {
//     //add a category
//     addCategory: async (req, res) => {
//         let { category } = req.body;
//         try {
//             const isExist = new Category ({
//                 category_name: category,
//             });
            
//             if (!isExist) {
//                 await category.create(req.body)
//                 return res.status(200).send({message: 'Add category sucessfully'});
//             } else {
//                 return res.status(400).send({error: 'Failed to add category'});
//             }
//         } catch (error) {
//             res.status(400).send({error: 'Failed to add category'});
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
//     }
//     deleteCategory: async (req, res) => {
//         try {
//             const { categoryId } = req.params;

//             const deleteCategory = await Category.findByIdAndRemove(categoryId);
            
//             if (!deleteCategory) {
//                 return res.status(404).send({error: 'Category not found' });
//             }
//             res.status(200).send({message: 'Category deleted successfully'});
//         } catch (error) {
//             res.status(500).send({error: 'Failed to delete category'});
//         }
//     }

// };