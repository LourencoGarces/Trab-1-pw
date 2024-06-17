const privateRouter = require('express').Router(); // Create a new router instance from Express

// Route for the profile management page
privateRouter.get('/Management_profile', (req, res) => {
    // Construct the file path to the 'Management_Profile.html' file
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Management_Profile.html');
    
    // Log the file path to the console
    console.log('Sending file:', filePath);
    
    // Send the 'Management_Profile.html' file as the response
    res.sendFile(filePath);
});

// Route for the profile administration page
privateRouter.get('/ProfileAdmin', (req, res) => {
    // Construct the file path to the 'ProfileAdmin.html' file
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'ProfileAdmin.html');
    
    // Log the file path to the console
    console.log('Sending file:', filePath);
    
    // Send the 'ProfileAdmin.html' file as the response
    res.sendFile(filePath);
});

// Export the router to be used in other parts of the application
module.exports = privateRouter;
