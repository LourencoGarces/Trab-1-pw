const usersRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Users');

// CRUD operations for users
usersRouter.get('/', controller.getAll); // Get all users
usersRouter.get('/:id', controller.getById); // Get a user by id
usersRouter.post('/create', controller.create); // Create a new user
usersRouter.put('/update/:id', controller.update); // Update a user by id
usersRouter.delete('/delete/:id', controller.delete); // Delete a user by id
usersRouter.post('/login', controller.login); // Login the user
usersRouter.get('/email/:email', controller.getUserByEmail); // Get a user by email
usersRouter.post('/changepassword', controller.changepassword); // ChangePassword
usersRouter.post('/forgotpassword', controller.forgotpassword); // ForgotPassword
usersRouter.post('/resetpassword', controller.resetpassword); // ResetPassword

module.exports = usersRouter;
