const privateRouter = require('express').Router();

// Route for the profile management page
privateRouter.get('/Management_profile', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Management_Profile.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

// Route for the profile administration page
privateRouter.get('/ProfileAdmin', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'ProfileAdmin.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

module.exports = privateRouter;
