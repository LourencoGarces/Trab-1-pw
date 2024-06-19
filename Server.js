require('dotenv').config(); // Load environment variables from the .env file

const bodyParser = require('body-parser'); // Middleware to parse request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const express = require('express'); // Import the Express framework
const path = require('path'); // Import the path module to work with file paths

const routerPgs = require('./Routes/Pgs/Index'); // Import Pgs routes
const publicRouter = require('./Routes/Public'); // Import public routes
const privateRouter = require('./Routes/Private'); // Import private routes
const categoriesRouter = require('./Routes/Pgs/Categories'); // Import category routes
const productsRouter = require('./Routes/Pgs/Products'); // Import product routes



const app = express(); // Create an instance of Express
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

// Serve static files from the 'Pages' folder
app.use(express.static(path.join(__dirname, 'Pages')));

// Route to serve login-explore.html as the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages/Login-explore.html'));
});

// Main routes to use in Postman
app.use('/Public', publicRouter); // Use publicRouter for the /Public route
app.use('/Private', privateRouter); // Use privateRouter for the /Private route
app.use('/Api/Pgs', routerPgs); // Use routerPgs for the /Api/Pgs route
app.use('/Api/Pgs/Categories', categoriesRouter); // Use categoriesRouter for the /Api/Pgs/Categories route
app.use('/Api/Pgs/products', productsRouter); // Use productsRouter for the /Api/Pgs/products route

const port = process.env.SERVER_PORT || 4242; // Set the server port, default to 4242 if not specified

app.listen(port, () => {
    console.log(
    `
    App listening at http://localhost:${port}`);
    });