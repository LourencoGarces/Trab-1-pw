const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Function to get all follow records
exports.getAll = async (req, res) => {
    try {
        // Read all records from the 'A_seguir' table
        const response = await prisma.A_seguir.findMany();
        res.status(200).json(response); // Send the response with status 200 (OK)
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get a follow record by ID
exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    try {
        // Find the follow record with the given ID
        const response = await prisma.A_seguir.findUnique({
            where: {
                id_seguir: id,
            },
        });
        // Send the response with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}

// Function to create a new follow record
exports.create = async (req, res) => {
    // Get the data from the request body
    const { id_produto, alerta_preco, id_utilizador, id_lista } = req.body;

    try {
        // Create a new follow record with the given data
        const seguidos = await prisma.A_seguir.create({
            data: {
                id_produto: id_produto,
                alerta_preco: alerta_preco,
                id_utilizador: id_utilizador,
                id_lista: id_lista
            },
        });
        // Send the created follow record with status 201 (Created)
        res.status(201).json(seguidos);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to update a follow record
exports.update = async (req, res) => {
    const { id, id_produto, alerta_preco, id_utilizador, id_lista } = req.body;

    try {
        // Find the follow record by ID and update with new data
        const seguidos = await prisma.A_seguir.update({
            where: {
                id_seguir: id * 1,
            },
            data: {
                id_produto: id_produto,
                alerta_preco: alerta_preco,
                id_utilizador: id_utilizador,
                id_lista: id_lista
            },
        });
        // Send the updated follow record with status 200 (OK)
        res.status(200).json(seguidos);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to delete a follow record by ID
exports.delete = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id;
    try {
        // Delete the follow record with the given ID
        await prisma.A_seguir.delete({
            where: {
                id_seguir: id * 1,
            },
        });
        // Send a success message with status 200 (OK)
        res.status(200).send("Apagado com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}
