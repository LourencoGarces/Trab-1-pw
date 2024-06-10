const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const response = await prisma.produtos.findMany();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
};

exports.getById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await prisma.produtos.findUnique({
            where: {
                id_produto: id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

exports.create = async (req, res) => {
    const { nome, descricao, imagem, preco, fabricante, id_categoria } = req.body;
    try {
        const newProduct = await prisma.produtos.create({
            data: {
                nome,
                descricao,
                imagem,
                preco,
                fabricante,
                id_categoria
            }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.update = async (req, res) => {
    const { id, nome, descricao, preco, fabricante, id_categoria, imagem } = req.body;
    try {
        const produto = await prisma.produtos.update({
            where: {
                id_produto: parseInt(id),
            },
            data: {
                nome,
                descricao,
                imagem,
                preco,
                fabricante,
                id_categoria
            },
        });
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.produtos.delete({
            where: {
                id_produto: id,
            },
        });
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.getByCategory = async (req, res) => {
    const category = parseInt(req.params.categoria);
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                id_categoria: category
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getByImage = async (req, res) => {
    const image = req.params.imagem;
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                imagem: image
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getByManufacturer = async (req, res) => {
    const manufacturer = req.params.fabricante;
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                fabricante: manufacturer
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getByPrice = async (req, res) => {
    const price = parseFloat(req.params.preco);
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                preco: price
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getByName = async (req, res) => {
    const name = req.params.nome;
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                nome: name
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getByIdCategory = async (req, res) => {
    const id_category = parseInt(req.params.id_categoria);
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                id_categoria: id_category
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getByDetalhes = async (req, res) => {
    const detalhes = req.params.detalhes;
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                detalhes: detalhes
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
