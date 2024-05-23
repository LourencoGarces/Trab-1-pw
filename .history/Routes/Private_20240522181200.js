const express = require('express');
const privateRouter = express.Router();

// Route for the profile management page
privateRouter.get('/Management_profile', (req, res) => {
    res.sendFile('Management_Profile.html', { root: '.' });
});

// Route for the profile administration page
privateRouter.get('/ProfileAdmin', (req, res) => {
    res.sendFile('ProfileAdmin.html', { root: '.' });
});


privateRouter.put('/Management_profile', (req, res) => {
    // Logic to update an existing profile
});

privateRouter.delete('/Management_profile', (req, res) => {
    // Logic to delete a profile
});

privateRouter.post('/ProfileAdmin', (req, res) => {
    // Logic to create a new product
});

privateRouter.put('/ProfileAdmin', (req, res) => {
    // Logic to update an existing product
});

privateRouter.delete('/ProfileAdmin', (req, res) => {
    // Logic to delete a product
});

module.exports = privateRouter;
