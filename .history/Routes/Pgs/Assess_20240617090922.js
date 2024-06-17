const assessRouter = require('express').Router(); // Create a new router instance from Express
const controller = require('../../Controllers/Pgs/Assess'); // Import the Assess controller

// CRUD operations for assessments
assessRouter.get('/', controller.getAll); // Get all assessments
assessRouter.get('/:id', controller.getById); // Get an assessment by id
assessRouter.post('/create', controller.create); // Create a new assessment
assessRouter.put('/update/:id', controller.update); // Update an assessment by id
assessRouter.delete('/delete/:id', controller.delete); // Delete an assessment by id

// Export the router to be used in other parts of the application
module.exports = assessRouter;
