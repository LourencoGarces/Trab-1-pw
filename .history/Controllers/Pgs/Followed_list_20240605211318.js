const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Function to get all followed lists
exports.getAll = async (req, res) => {
    try {
        // Read all records from the 'Lista_seguidos' table
        const response = await prisma.Lista_seguidos.findMany();
        res.status(200).json(response); // Send the response with status 200 (OK)
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get a followed list by ID
exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    try {
        // Find the followed list with the given ID
        const response = await prisma.Lista_seguidos.findUnique({
            where: {
                id_lista: id,
            },
        });
        // Send the response with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}

// Function to create a new followed list
exports.create = async (req, res) => {
    // Get the data from the request body
    const { id_utilizador } = req.body;

    try {
        // Create a new followed list with the given data
        const lista = await prisma.Lista_seguidos.create({
            data: {
                id_utilizador: id_utilizador
            },
        });
        // Send the created followed list with status 201 (Created)
        res.status(201).json(lista);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to update a followed list
exports.update = async (req, res) => {
    const { id, id_utilizador } = req.body;

    try {
        // Find the followed list by ID and update with new data
        const lista = await prisma.Lista_seguidos.update({
            where: {
                id_lista: id * 1,
            },
            data: {
                id_utilizador: id_utilizador
            },
        });
        // Send the updated followed list with status 200 (OK)
        res.status(200).json(lista);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to delete a followed list by ID
exports.delete = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id;
    try {
        // Delete the followed list with the given ID
        await prisma.Lista_seguidos.delete({
            where: {
                id_lista: id * 1,
            },
        });
        // Send a success message with status 200 (OK)
        res.status(200).send("Apagada com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}
