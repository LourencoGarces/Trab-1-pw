require('dotenv').config(); // Load environment variables from .env file

const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const express = require('express'); // Import the express framework

// const routerLocal = require('./Routes/Local/Index'); // Import local routes (commented out)
const routerPgs = require('./Routes/Pgs/Index'); // Import Pgs routes
const publicRouter = require('./Routes/Public'); // Import public routes
const privateRouter = require('./Routes/Private'); // Import private routes

const app = express(); // Create an instance of express
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

// Serve static files
app.use(express.static('Pages')); // Serve static files from Pages directory

// Main routes
app.use('/', publicRouter); // Use publicRouter for the root path
app.use('/Private/', privateRouter); // Use privateRouter for /Private path
// app.use('/Api/Local/', routerLocal); // Use routerLocal for /Api/Local path (commented out)
app.use('/Api/Pgs/', routerPgs); // Use routerPgs for /Api/Pgs path

const port = process.env.SERVER_PORT || 4242; // Define the server port, default to 4242 if not specified
app.listen(port, () => { // Start the express server
    console.log('Express server listening on port', port); // Log server listening message
    console.log('Port open', port); // Log port open message
});