const pricesRouter = require('express').Router(); // Create a new router instance from Express
const controller = require('../../Controllers/Pgs/Prices'); // Import the Prices controller

// CRUD operations for prices
pricesRouter.get('/', controller.getAll); // Get all prices
pricesRouter.get('/:id', controller.getById); // Get a price by id
pricesRouter.post('/create', controller.create); // Create a new price
pricesRouter.put('/update/:id', controller.update); // Update a price by id
pricesRouter.delete('/delete/:id', controller.delete); // Delete a price by id

// Export the router to be used in other parts of the application
module.exports = pricesRouter;
