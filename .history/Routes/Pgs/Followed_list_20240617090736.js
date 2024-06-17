const followedRouter = require('express').Router(); // Create a new router instance from Express
const controller = require('../../Controllers/Pgs/Followed_list'); // Import the Followed_list controller

// CRUD operations for followed list
followedRouter.get('/', controller.getAll); // Get all followed lists
followedRouter.get('/:id', controller.getById); // Get a followed list by id
followedRouter.post('/create', controller.create); // Create a new followed list
followedRouter.put('/update/:id', controller.update); // Update a followed list by id
followedRouter.delete('/delete/:id', controller.delete); // Delete a followed list by id

// Export the router to be used in other parts of the application
module.exports = followedRouter;
