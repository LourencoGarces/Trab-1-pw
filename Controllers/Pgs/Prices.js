const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Get all prices
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.Precos.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get a price by id
exports.getById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const response = await prisma.Precos.findUnique({
            where: {
                id_preco: id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

// Create a new price
exports.create = async (req, res) => {
    const { id_produto, data_preco } = req.body;

    try {
        const preco = await prisma.Precos.create({
            data: {
                id_produto: id_produto,
                data_preco: new Date(data_preco),
            },
        });
        res.status(201).json(preco);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update a price
exports.update = async (req, res) => {
    const { id, id_produto, data_preco } = req.body;

    try {
        const preco = await prisma.Precos.update({
            where: {
                id_preco: id * 1,
            },
            data: {
                id_produto: id_produto,
                data_preco: new Date(data_preco),
            },
        });
        res.status(200).json(preco);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Delete a price
exports.delete = async (req, res) => {
    const id = req.params.id * 1;
    try {
        await prisma.Precos.delete({
            where: {
                id_preco: id,
            },
        });
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
