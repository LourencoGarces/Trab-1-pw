const express = require('express');
const privateRouter = express.Router();

// Define uma rota para a página HTML
privateRouter.get('/Private', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('ProfileAdmin.html', { root: '.' });
});

// Route for the profile management page
privateRouter.get('/Management_profile', (req, res) => {
    res.sendFile('Management_Profile.html', { root: '.' });
});

// Route for the profile administration page
privateRouter.get('/ProfileAdmin', (req, res) => {
    res.sendFile('ProfileAdmin.html', { root: '.' });
});
// Route to create a new profile
privateRouter.post('/Management_profile', async (req, res) => {
    const { nome, email, contacto, password } = req.body;
    try {
        const newUser = await prisma.utilizador.create({
            data: { nome, email, contacto, password }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// Route to update an existing profile
privateRouter.put('/Management_profile/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, contacto, password } = req.body;
    try {
        const updatedUser = await prisma.utilizador.update({
            where: { id_utilizador: parseInt(id) },
            data: { nome, email, contacto, password }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});

// Route to delete a profile
privateRouter.delete('/Management_profile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.utilizador.delete({
            where: { id_utilizador: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete user' });
    }
});

// Route to create a new product
privateRouter.post('/ProfileAdmin', async (req, res) => {
    const { nome, descricao, preco, fabricante, id_categoria } = req.body;
    try {
        const newProduct = await prisma.produtos.create({
            data: { nome, descricao, preco, fabricante, id_categoria }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create product' });
    }
});

// Route to update an existing product
privateRouter.put('/ProfileAdmin/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, fabricante, id_categoria } = req.body;
    try {
        const updatedProduct = await prisma.produtos.update({
            where: { id_produto: parseInt(id) },
            data: { nome, descricao, preco, fabricante, id_categoria }
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update product' });
    }
});

// Route to delete a product
privateRouter.delete('/ProfileAdmin/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.produtos.delete({
            where: { id_produto: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete product' });
    }
});

module.exports = privateRouter;
