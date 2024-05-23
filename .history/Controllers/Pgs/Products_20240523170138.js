const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Test the connection
exports.testConnection = async (req, res) => {
    try {
        await prisma.$connect(); // Try to connect to the database
        res.send('Successfully connected to PostgreSQL!');
    } catch (error) {
        res.send('Error connecting to PostgreSQL:', error); // Catch and display any connection errors
    } finally {
        await prisma.$disconnect(); // Disconnect from the database
    }
}

// Retrieve all products
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.Produtos.findMany(); // Read the "Produtos" table
        res.status(200).json(response); // Return all products with a 200 status code
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Return a 500 status code with an error message if something goes wrong
    }
}

// Retrieve a specific product by its ID
exports.getById = async (req, res) => {
    const id = req.params.id * 1; // Get the ID from the request parameters and convert it to a number
    try {
        const response = await prisma.Produtos.findUnique({
            where: { id: id }, // Find the product with the specified ID
        })
        res.status(200).json(response); // Return the product with a 200 status code
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Return a 404 status code with an error message if the product is not found
    }
}

// Create a new product
exports.create = async (req, res) => {
    const { nome, descricao, preco, fabricante } = req.body; // Get the product details from the request body
    try {
        const produto = await prisma.Produtos.create({
            data: { nome, descricao, preco, fabricante }, // Create a new product with the provided details
        })
        res.status(201).json(produto); // Return the created product with a 201 status code
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Return a 400 status code with an error message if something goes wrong
    }
}

// Update an existing product
exports.update = async (req, res) => {
    const { id, nome, descricao, preco, fabricante } = req.body; // Get the product details from the request body

    try {
        const produto = await prisma.Produtos.update({
            where: { id: id * 1 }, // Find the product with the specified ID
            data: { nome, descricao, preco, fabricante }, // Update the product with the new details
        })
        res.status(200).json(produto); // Return the updated product with a 200 status code
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Return a 400 status code with an error message if something goes wrong
    }
}

// Delete a product by its ID
exports.delete = async (req, res) => {
    const id = req.params.id; // Get the ID from the request parameters
    try {
        await prisma.Produtos.delete({
            where: { id: id * 1 }, // Delete the product with the specified ID
        })
        res.status(200).send("ok"); // Return a 200 status code with a simple "ok" message
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Return a 400 status code with an error message if something goes wrong
    }
}
