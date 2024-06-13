// Import PrismaClient from the Prisma client package
const { PrismaClient } = require('@prisma/client');

// Instantiate a new PrismaClient
const prisma = new PrismaClient();

// Define a function to get all products
exports.getAll = async (req, res) => {
    try {
        // Fetch all products from the database
        const response = await prisma.Produtos.findMany();
        // Send the fetched products as a response
        res.json(response);
    } catch (error) {
        // Log the error and send an error response
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
};

// Define a function to get a product by its ID
exports.getById = async (req, res) => {
    // Parse the ID from the request parameters
    const id = parseInt(req.params.id);
    try {
        // Fetch the product with the specified ID from the database
        const response = await prisma.Produtos.findUnique({
            where: {
                id_produto: id_produto,
            },
        });
        // Send the fetched product as a response
        res.status(200).json(response);
    } catch (error) {
        // Send an error response
        res.status(404).json({ msg: error.message });
    }
};

// Define a function to create a new product
exports.create = async (req, res) => {
    // Destructure the product data from the request body
    const { nome, descricao, imagem, preco, fabricante, categoria } = req.body;
    try {
        // Create a new product in the database with the provided data
        const newProduct = await prisma.Produtos.create({
            data: {
                nome: nome,
                descricao: descricao,
                preco: preco, 
                fabricante: fabricante,
                id_categoria: categoria, 
                imagem: imagem
            },
        });
        // Send the created product as a response
        res.status(201).json(newProduct);
    } catch (error) {
        // Send an error response
        res.status(400).json({ msg: error.message });
    }
};

// Define a function to update a product
exports.update = async (req, res) => {
    // Destructure the product data from the request body
    const { id, nome, descricao, preco, fabricante, imagem, categoria } = req.body;
    try {
        // Update the product with the specified ID in the database
        const produto = await prisma.Produtos.update({
            where: {
                id_produto: parseInt(id),
            },
            data: {
                nome: nome,
                descricao: descricao,
                preco: preco, 
                fabricante: fabricante,
                id_categoria: categoria, 
                imagem: imagem
            },
        });
        // Send the updated product as a response
        res.status(200).json(produto);
    } catch (error) {
        // Send an error response
        res.status(400).json({ msg: error.message });
    }
};

// Define a function to delete a product
exports.delete = async (req, res) => {
    // Parse the ID from the request parameters
    const id = parseInt(req.params.id);
    try {
        // Delete the product with the specified ID from the database
        await prisma.Produtos.delete({
            where: {
                id_produto: id_produto,
            },
        });
        // Send a success response
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        // Send an error response
        res.status(400).json({ msg: error.message });
    }
};

// Define a function to get products by category
exports.getByCategory = async (req, res) => {
    // Parse the category from the request parameters
    const category = parseInt(req.params.categoria);
    try {
        // Fetch the products with the specified category from the database
        const produtos = await prisma.Produtos.findMany({
            where: {
                id_categoria: id_categoria,
            },
        });
        // Send the fetched products as a response
        res.status(200).json(produtos);
    } catch (error) {
        // Send an error response
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by image
exports.getByImage = async (req, res) => {
    // Get the image from the request parameters
    const image = req.params.imagem;
    try {
        // Fetch the products with the specified image from the database
        const produtos = await prisma.Produtos.findMany({
            where: {
                imagem: imagem,
            },
        });
        // Send the fetched products as a response
        res.status(200).json(produtos);
    } catch (error) {
        // Send an error response
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by manufacturer
exports.getByManufacturer = async (req, res) => {
    // Get the manufacturer from the request parameters
    const manufacturer = req.params.fabricante;
    try {
        // Fetch the products with the specified manufacturer from the database
        const produtos = await prisma.produtos.findMany({
            where: {
                fabricante: fabricante,
            },
        });
        // Send the fetched products as a response
        res.status(200).json(produtos);
    } catch (error) {
        // Send an error response
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by price
exports.getByPrice = async (req, res) => {
    // Parse the price from the request parameters
    const price = parseFloat(req.params.preco);
    try {
        // Fetch the products with the specified price from the database
        const produtos = await prisma.produtos.findMany({
            where: {
                preco: preco,
            },
        });
        // Send the fetched products as a response
        res.status(200).json(produtos);
    } catch (error) {
        // Send an error response
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by name
exports.getByName = async (req, res) => {
    // Get the name from the request parameters
    const name = req.params.nome;
    try {
        // Fetch the products with the specified name from the database
        const produtos = await prisma.Produtos.findMany({
            where: {
                nome: nome,
            },
        });
        // Send the fetched products as a response
        res.status(200).json(produtos);
    } catch (error) {
        // Send an error response
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by category ID
exports.getByIdCategory = async (req, res) => {
    // Parse the category ID from the request parameters
    const id_category = parseInt(req.params.id_categoria);
    try {
        // Fetch the products with the specified category ID from the database
        const produtos = await prisma.Produtos.findMany({
            where: {
                id_categoria: id_categoria,
            },
        });
        // Send the fetched products as a response
        res.status(200).json(produtos);
    } catch (error) {
        // Send an error response
        res.status(500).json({ msg: error.message });
    }
};
//Fuction to get products by descricao
exports.getByDetalhes = async (req, res) => {
    // Get the descricao from the request parameters
    const detalhes = req.params.detalhes;
    try {
        // Find the product with the given descricao
        const response = await prisma.Produtos.findUnique({
            where: {
                descricao: descricao,
            },
        });
        // Send the response with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}