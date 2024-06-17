const categoriesRouter = require('express').Router(); // Create a new router instance from Express
// Import the categories controller
const controller = require('../../Controllers/Pgs/Categories');

// Define the CRUD routes for categories
categoriesRouter.get('/', controller.getAll); // Read all categories
categoriesRouter.get('/:id', controller.getById); // Read a category specified by id
categoriesRouter.post('/create', controller.create); // Create a new category
categoriesRouter.put('/update/:id', controller.update); // Update a category specified by id
categoriesRouter.delete('/delete/:id', controller.delete); // Delete a category specified by id
categoriesRouter.get('/descricao/:descricao', controller.getByDescricao); // Read a category specified by description

// Export the categories router to be used in other parts of the application
module.exports = categoriesRouter;
