const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fetchProductData } = require('../../services/scrapingService');

// Define a function to get all products
const getAll = async (req, res) => {
    try {
        const response = await prisma.produtos.findMany();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
};

// Define a function to get a product by its ID
const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await prisma.produtos.findUnique({
            where: { id_produto: id },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// Define a function to create a new product
const create = async (req, res) => {
    const { nome, descricao, imagem, preco, fabricante } = req.body;
    try {
        const newProduct = await prisma.produtos.create({
            data: { nome, descricao, preco, fabricante, imagem },
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Define a function to update a product
const update = async (req, res) => {
    const { id, nome, descricao, preco, fabricante, imagem } = req.body;
    try {
        const produto = await prisma.produtos.update({
            where: { id_produto: parseInt(id) },
            data: { nome, descricao, preco, fabricante, imagem },
        });
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Define a function to delete a product
const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.produtos.delete({
            where: { id_produto: id },
        });
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Define a function to get products by category
const getByCategory = async (req, res) => {
    const id_categoria = parseInt(req.params.categoria);
    try {
        const produtos = await prisma.produtos.findMany({
            where: { id_categoria },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by image
const getByImage = async (req, res) => {
    const imagem = req.params.imagem;
    try {
        const produtos = await prisma.produtos.findMany({
            where: { imagem },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by manufacturer
const getByManufacturer = async (req, res) => {
    const fabricante = req.params.fabricante;
    try {
        const produtos = await prisma.produtos.findMany({
            where: { fabricante },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by price
const getByPrice = async (req, res) => {
    const preco = parseFloat(req.params.preco);
    try {
        const produtos = await prisma.produtos.findMany({
            where: { preco },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by name
const getByName = async (req, res) => {
    const nome = req.params.nome;
    try {
        const produtos = await prisma.produtos.findMany({
            where: { nome },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Define a function to get products by category ID
const getByIdCategory = async (req, res) => {
    const id_categoria = parseInt(req.params.id_categoria);
    try {
        const produtos = await prisma.produtos.findMany({
            where: { id_categoria },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to get products by detalhes (details)
const getByDetalhes = async (req, res) => {
    const descricao = req.params.detalhes;
    try {
        const response = await prisma.produtos.findUnique({
            where: { descricao },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// Function to save a product to the database
async function saveProduct(productData) {
    try {
        const categoria = await prisma.categorias.upsert({
            where: { descricao: productData.categoria },
            update: {},
            create: { descricao: productData.categoria },
        });

        const produto = await prisma.produtos.create({
            data: {
                nome: productData.nome,
                descricao: productData.descricao,
                preco: productData.preco,
                fabricante: productData.fabricante,
                imagem: productData.imagem,
                id_categoria: categoria.id_categoria,
            },
        });

        return produto;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to scrape product data from a URL and save it to the database
async function scrapeAndSaveProduct(req, res) {
    const { url } = req.body;
    const productData = await fetchProductData(url);
    if (productData) {
        const savedProduct = await saveProduct(productData);
        res.status(201).json(savedProduct);
    } else {
        res.status(500).json({ error: 'Failed to fetch product data' });
    }
}

// Export all the functions to be used in other parts of the application
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteProduct,
    getByCategory,
    getByImage,
    getByManufacturer,
    getByPrice,
    getByName,
    getByIdCategory,
    getByDetalhes,
    scrapeAndSaveProduct,
};
