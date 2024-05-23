require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const routerLocal = require('./Routes/Local/Index');
const routerPgs = require('./Routes/Pgs/Products'); // Ensure this path is correct
const publicRouter = require('./Routes/Public');
const privateRouter = require('./Routes/Private');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use('/Styles', express.static('Styles'));
app.use('/Assets', express.static('Assets'));
app.use('/Scripts', express.static('Scripts'));
app.use(express.static('Pages'));

// Main routes
app.use('/', publicRouter);
app.use('/Private/', privateRouter);
app.use('/Api/Local/', routerLocal);
app.use('/Api/Pgs/', routerPgs);

const port = process.env.SERVER_PORT || 4242;
app.listen(port, () => {
    console.log('Express server listening on port', port);
    console.log('Port open', port);
});
