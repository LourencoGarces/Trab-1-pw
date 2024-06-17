const followingRouter = require('express').Router(); // Create a new router instance from Express
const controller = require('../../Controllers/Pgs/Following'); // Import the Following controller

// CRUD operations for following
followingRouter.get('/', controller.getAll); // Get all followings
followingRouter.get('/:id', controller.getById); // Get a following by id
followingRouter.post('/create', controller.create); // Create a new following
followingRouter.put('/update/:id', controller.update); // Update a following by id
followingRouter.delete('/delete/:id', controller.delete); // Delete a following by id

// Export the router to be used in other parts of the application
module.exports = followingRouter;
