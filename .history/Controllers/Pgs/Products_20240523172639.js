const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Test the connection
router.get('/testConnection', async (req, res) => {
    try {
        await prisma.$connect();
        res.send('Successfully connected to PostgreSQL!');
    } catch (error) {
        res.send('Error connecting to PostgreSQL:', error);
    } finally {
        await prisma.$disconnect();
    }
});

// Retrieve all products
router.get('/products', async (req, res) => {
    try {
        const response = await prisma.Produtos.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Retrieve a specific product by its ID
router.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const response = await prisma.Produtos.findUnique({
            where: { id: id },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
});

// Create a new product
router.post('/products', async (req, res) => {
    const { nome, descricao, preco, fabricante } = req.body;
    try {
        const produto = await prisma.Produtos.create({
            data: { nome, descricao, preco, fabricante },
        });
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

// Update an existing product
router.put('/products', async (req, res) => {
    const { id, nome, descricao, preco, fabricante } = req.body;
    try {
        const produto = await prisma.Produtos.update({
            where: { id: parseInt(id, 10) },
            data: { nome, descricao, preco, fabricante },
        });
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

// Delete a product by its ID
router.delete('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        await prisma.Produtos.delete({
            where: { id: id },
        });
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = router;
