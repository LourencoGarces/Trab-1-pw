require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Import the express framework
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing

const app = express(); // Create an instance of express

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data with querystring library
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

const port = process.env.SERVER_PORT || 4242; // Define the server port, default to 4242 if not specified
app.listen(port, () => { // Start the express server
    console.log('Express server listening on port', port); // Log server listening message
    console.log('Port open', port); // Log port open message
});
