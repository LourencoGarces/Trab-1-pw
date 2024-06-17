const categoriesRouter = require('express').Router();
// Import the categories controller
const controller = require('../../Controllers/Pgs/Categories');

// Define the CRUD routes for categories
categoriesRouter.get('/', controller.getAll); // Read all categories
categoriesRouter.get('/:id', controller.getById); // Read a category specified by id
categoriesRouter.post('/create', controller.create); // Create a new category
categoriesRouter.put('/update/:id', controller.update); // Update a category
categoriesRouter.delete('/delete/:id', controller.delete); // Delete a category
categoriesRouter.get('/descricao/:descricao', controller.getByDescricao); // Read a category specified by description

// Export the categories router
module.exports = categoriesRouter;