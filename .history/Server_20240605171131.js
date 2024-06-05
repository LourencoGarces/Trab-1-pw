require('dotenv').config(); // Load environment variables from .env file

const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const express = require('express'); // Import the express framework

// const routerLocal = require('./Routes/Local/Index'); // Import local routes (commented out)
const routerPgs = require('./Routes/Pgs/Index'); // Import Pgs routes
const publicRouter = require('./Routes/Public'); // Import public routes
const privateRouter = require('./Routes/Private'); // Import private routes

const app = express(); // Create an instance of express
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

// Serve static files
// app.use('/Styles', express.static('Styles')); // Serve static files from Styles directory (commented out)
// app.use('/Assets', express.static('Assets')); // Serve static files from Assets directory (commented out)
// app.use('/Scripts', express.static('Scripts')); // Serve static files from Scripts directory (commented out)
app.use(express.static('Pages')); // Serve static files from Pages directory

// Main routes
app.use('/', publicRouter); // Use publicRouter for the root path
app.use('/Private/', privateRouter); // Use privateRouter for /Private path
// app.use('/Api/Local/', routerLocal); // Use routerLocal for /Api/Local path (commented out)
app.use('/Api/Pgs/', routerPgs); // Use routerPgs for /Api/Pgs path

const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create an instance of PrismaClient

// Add database connection test route
app.get('/test-db', async (req, res) => { // Define a GET endpoint for /test-db
    try {
        const utilizadores = await prisma.utilizador.findMany(); // Fetch all records from utilizador table
        const avaliacoes = await prisma.avaliar.findMany(); // Fetch all records from avaliar table
        const produtos = await prisma.produtos.findMany(); // Fetch all records from produtos table
        const precos = await prisma.precos.findMany(); // Fetch all records from precos table
        const aSeguir = await prisma.a_seguir.findMany(); // Fetch all records from a_seguir table
        const listaSeguidos = await prisma.lista_seguidos.findMany(); // Fetch all records from lista_seguidos table
        const categorias = await prisma.categorias.findMany(); // Fetch all records from categorias table

        res.json({ utilizadores, avaliacoes, produtos, precos, aSeguir, listaSeguidos, categorias }); // Return fetched data as JSON
    } catch (error) {
        res.status(500).json({ error: error.message }); // Return error message in case of failure
    }
});
// POST route to create new records
app.post('/test-db', async (req, res) => {
    try {
        const { table, data } = req.body;

        // Log the table and data to debug
        console.log(`Table: ${table}`);
        console.log(`Data: ${JSON.stringify(data)}`);

        if (!prisma[table]) {
            console.error(`Table ${table} does not exist.`);
            throw new Error(`Table ${table} does not exist.`);
        }
        
        const newRecord = await prisma[table].create({ data });
        res.json(newRecord);
    } catch (error) {
        console.error(`Error: ${error.message}`); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
});

// PUT route to update an entire record by ID
app.put('/test-db/:table/:id', async (req, res) => {
    try {
        const { table, id } = req.params; // Destructure table name and ID from the request parameters
        const data = req.body; // Get data from the request body
        const updatedRecord = await prisma[table].update({
            where: { id: parseInt(id) },
            data
        });
        res.json(updatedRecord); // Return the updated record
    } catch (error) {
        console.error(`Error: ${error.message}`); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Return error message in case of failure
    }
});

// PATCH route to update part of a record by ID
app.patch('/test-db/:table/:id', async (req, res) => {
    try {
        const { table, id } = req.params; // Destructure table name and ID from the request parameters
        const data = req.body; // Get data from the request body
        const updatedRecord = await prisma[table].update({
            where: { id: parseInt(id) },
            data
        });
        res.json(updatedRecord); // Return the updated record
    } catch (error) {
        console.error(`Error: ${error.message}`); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Return error message in case of failure
    }
});

// DELETE route to delete a record by ID
app.delete('/test-db/:table/:id', async (req, res) => {
    try {
        const { table, id } = req.params; // Destructure table name and ID from the request parameters
        await prisma[table].delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send(); // Send no content status after deletion
    } catch (error) {
        console.error(`Error: ${error.message}`); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Return error message in case of failure
    }
});


const port = process.env.SERVER_PORT || 4242; // Define the server port, default to 4242 if not specified
app.listen(port, () => { // Start the express server
    console.log('Express server listening on port', port); // Log server listening message
    console.log('Port open', port); // Log port open message
});
