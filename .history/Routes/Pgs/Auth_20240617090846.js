const autenticationRouter = require('express').Router(); // Create a new router instance from Express
const controller = require('../../Controllers/Pgs/Auth'); // Import the Auth controller

// Define the authentication routes
autenticationRouter.post('/signin', controller.signin); // Sign in route
autenticationRouter.post('/signup', controller.signup); // Sign up route
autenticationRouter.post('/readToken', controller.readToken); // Route to read a token

// Export the authentication router to be used in other parts of the application
module.exports = autenticationRouter;
