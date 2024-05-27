const usersRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Users');

//test the connexion to DB
usersRouter.get('/testeConn', controller.testConnection);

// CRUD operations for users
usersRouter.get('/', controller.getAll); // Get all users
usersRouter.get('/:id', controller.getById); // Get a user by id
usersRouter.post('/create', controller.create); // Create a new user
usersRouter.put('/update/:id', controller.update); // Update a user by id
usersRouter.delete('/delete/:id', controller.delete); // Delete a user by id

module.exports = usersRouter;
