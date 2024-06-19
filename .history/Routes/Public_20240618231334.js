const publicRouter = require('express').Router(); // Create a new router instance from Express

// Define a GET route for the root path
publicRouter.get('/', (req, res) => {
    // Construct the file path to the 'Login-explore.html' file
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Index.html');
    
    // Log the file path to the console
    console.log('Sending file:', filePath);
    
    // Send the 'Login-explore.html' file as the response
    res.sendFile(filePath);
});

// Export the router to be used in other parts of the application
module.exports = publicRouter;
