// Routes/Pgs/Index.js

const router = require('express').Router(); // Create a new router instance from Express
const productsRouter = require('./Products'); // Import the Products router
const usersRouter = require('./Users'); // Import the Users router
const categoriesRouter = require('./Categories'); // Import the Categories router
const assessRouter = require('./Assess'); // Import the Assess router
const pricesRouter = require('./Prices'); // Import the Prices router
const followedRouter = require('./Followed_list'); // Import the Followed_list router
const followingRouter = require('./Following'); // Import the Following router
const autenticationRouter = require('./Auth'); // Import the Auth router

// Define the routes and their corresponding routers
router.use('/Products', productsRouter); // Use productsRouter for the /Products route
router.use('/Users', usersRouter); // Use usersRouter for the /Users route
router.use('/Categories', categoriesRouter); // Use categoriesRouter for the /Categories route
router.use('/Assess', assessRouter); // Use assessRouter for the /Assess route
router.use('/Prices', pricesRouter); // Use pricesRouter for the /Prices route
router.use('/Followed_list', followedRouter); // Use followedRouter for the /Followed_list route
router.use('/Following', followingRouter); // Use followingRouter for the /Following route
router.use('/Auth', autenticationRouter); // Use autenticationRouter for the /Auth route

// Export the main router to be used in other parts of the application
module.exports = router;
