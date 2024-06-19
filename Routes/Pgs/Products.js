// /Routes/Pgs/Products.js

const express = require('express'); // Import the Express framework
const path = require('path'); // Import the path module to work with file paths
const controller = require('../../Controllers/Pgs/Products'); // Import the Products controller

const productsRouter = express.Router(); // Create a new router instance from Express

// CRUD operations for products
productsRouter.get('/', controller.getAll); // Get all products
productsRouter.get('/:id', controller.getById); // Get a product by id
productsRouter.post('/create', controller.create); // Create a new product
productsRouter.put('/update/:id', controller.update); // Update a product by id
productsRouter.delete('/delete/:id', controller.delete); // Delete a product by id

// Function to get products by category
productsRouter.get('/category/:categoria', controller.getByCategory); // Get products by category
// Function to get products by image
productsRouter.get('/image/:imagem', controller.getByImage); // Get products by image
// Function to get products by manufacturer
productsRouter.get('/manufacturer/:fabricante', controller.getByManufacturer); // Get products by manufacturer
// Function to get products by price
productsRouter.get('/price/:preco', controller.getByPrice); // Get products by price
// Function to get products by name
productsRouter.get('/name/:nome', controller.getByName); // Get products by name
// Function to get products by category ID
productsRouter.get('/id_category/:id_categoria', controller.getByIdCategory); // Get products by category ID
// Function to get products by details
productsRouter.get('/detalhes/:detalhes', controller.getByDetalhes); // Get products by details
// Wishlist routes
productsRouter.post('/wishlist', controller.addToWishlist);
productsRouter.get('/wishlist/:userId', controller.getWishlist);
productsRouter.delete('/wishlist/:userId/:productId', controller.removeFromWishlist);



// Route to serve the HTML for a specific product by id
productsRouter.get('/product/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/Product.html'));
});

// Export the router to be used in other parts of the application
module.exports = productsRouter;
