const usersRouter = require('express').Router(); // Create a new router instance from Express
const controller = require('../../Controllers/Pgs/Users'); // Import the Users controller

// CRUD operations for users
usersRouter.get('/', controller.getAll); // Get all users
usersRouter.get('/:id', controller.getById); // Get a user by id
usersRouter.post('/create', controller.create); // Create a new user
usersRouter.put('/update/:id', controller.update); // Update a user by id
usersRouter.delete('/delete/:id', controller.delete); // Delete a user by id

// Authentication and password management routes
usersRouter.post('/login', controller.login); // Login the user
usersRouter.get('/email/:email', controller.getUserByEmail); // Get a user by email
usersRouter.post('/changepassword', controller.changepassword); // Change the user's password
usersRouter.post('/forgotpassword', controller.forgotpassword); // Handle forgotten password
usersRouter.post('/resetpassword', controller.resetpassword); // Reset the user's password

// Export the router to be used in other parts of the application
module.exports = usersRouter;
