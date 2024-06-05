const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Function to get all prices
exports.getAll = async (req, res) => {
    try {
        // Read all records from the 'Precos' table
        const response = await prisma.Precos.findMany();
        res.status(200).json(response); // Send the response with status 200 (OK)
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get a price by ID
exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    try {
        // Find the price with the given ID
        const response = await prisma.Precos.findUnique({
            where: {
                id_preco: id,
            },
        });
        // Send the response with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}

// Function to create a new price
exports.create = async (req, res) => {
    // Get the data from the request body
    const { id_produto, data_preco } = req.body;

    try {
        // Create a new price with the given data
        const preco = await prisma.Precos.create({
            data: {
                id_produto: id_produto,
                data_preco: new Date(data_preco),
            },
        });
        // Send the created price with status 201 (Created)
        res.status(201).json(preco);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to update a price
exports.update = async (req, res) => {
    // Get the data from the request body
    const { id, id_produto, data_preco } = req.body;

    try {
        // Find the price by ID and update with new data
        const preco = await prisma.Precos.update({
            where: {
                id_preco: id * 1,
            },
            data: {
                id_produto: id_produto,
                data_preco: new Date(data_preco),
            },
        });
        // Send the updated price with status 200 (OK)
        res.status(200).json(preco);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to delete a price by ID
exports.delete = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    try {
        // Delete the price with the given ID
        await prisma.Precos.delete({
            where: {
                id_preco: id,
            },
        });
        // Send a success message with status 200 (OK)
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}
