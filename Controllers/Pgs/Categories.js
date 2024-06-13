const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Function to get all categories
exports.getAll = async (req, res) => {
    try {
        // Read all records from the 'Categorias' table
        const response = await prisma.Categorias.findMany();
        res.status(200).json(response); // Send the response with status 200 (OK)
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get a category by ID
exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    try {
        // Find the category with the given ID
        const response = await prisma.Categorias.findUnique({
            where: {
                id_categoria: id_categoria,
            },
        });
        // Send the response with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}

//Fuction to get category by descricao
exports.getByDescricao = async (req, res) => {
    // Get the descricao from the request parameters
    const descricao = req.params.descricao;
    try {
        // Find the category with the given descricao
        const response = await prisma.Categorias.findUnique({
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


// Function to create a new category
exports.create = async (req, res) => {
    // Get the data from the request body
    const { descricao } = req.body;

    try {
        // Create a new category with the given data
        const categoria = await prisma.Categorias.create({
            data: {
                descricao: descricao,
            },
        });
        // Send the created category with status 201 (Created)
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to update a category
exports.update = async (req, res) => {
    const { id, descricao } = req.body;

    try {
        // Find the category by ID and update with new data
        const categoria = await prisma.Categorias.update({
            where: {
                id_categoria: id * 1,
            },
            data: {
                descricao: descricao,
            },
        });
        // Send the updated category with status 200 (OK)
        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to delete a category by ID
exports.delete = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id;
    try {
        // Delete the category with the given ID
        await prisma.Categorias.delete({
            where: {
                id_categoria: id * 1,
            },
        });
        // Send a success message with status 200 (OK)
        res.status(200).send("Apagada com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}


