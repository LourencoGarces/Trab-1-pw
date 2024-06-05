const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Function to get all evaluations
exports.getAll = async (req, res) => {
    try {
        // Read all records from the 'Avaliar' table
        const response = await prisma.Avaliar.findMany();
        res.status(200).json(response); // Send the response with status 200 (OK)
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get an evaluation by ID
exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    try {
        // Find the evaluation with the given ID
        const response = await prisma.Avaliar.findUnique({
            where: {
                id_avaliacao: id,
            },
        });
        // Send the response with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}

// Function to create a new evaluation
exports.create = async (req, res) => {
    // Get the data from the request body
    const { id_utilizador, id_produto, produto, texto_comentario, data_avaliacao } = req.body;

    try {
        // Create a new evaluation with the given data
        const avaliar = await prisma.Avaliar.create({
            data: {
                id_utilizador: id_utilizador,
                id_produto: id_produto,
                produto: produto,
                texto_comentario: texto_comentario,
                data_avaliacao: data_avaliacao
            },
        });
        // Send the created evaluation with status 201 (Created)
        res.status(201).json(avaliar);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to update an evaluation
exports.update = async (req, res) => {
    const { id, id_utilizador, id_produto, produto, texto_comentario, data_avaliacao } = req.body;

    try {
        // Find the evaluation by ID and update with new data
        const avaliar = await prisma.Avaliar.update({
            where: {
                id_avaliacao: id * 1,
            },
            data: {
                id_utilizador: id_utilizador,
                id_produto: id_produto,
                produto: produto,
                texto_comentario: texto_comentario,
                data_avaliacao: data_avaliacao
            },
        });
        // Send the updated evaluation with status 200 (OK)
        res.status(200).json(avaliar);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to delete an evaluation by ID
exports.delete = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id;
    try {
        // Delete the evaluation with the given ID
        await prisma.Avaliar.delete({
            where: {
                id_avaliacao: id * 1,
            },
        });
        // Send a success message with status 200 (OK)
        res.status(200).send("Apagada com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}
