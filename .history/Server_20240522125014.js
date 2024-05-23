require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const routerLocal = require('./Routes/Local/Index');
const routerPgs = require('./Routes/Pgs/Index');
//ADD Private and Public Router /!\
const publicRouter = require('./Routes/Public');
const privateRouter = require('./Routes/Private');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.use(express.static('Styles'))
app.use('/Styles', express.static('Styles'))
app.use('/Assets', express.static('Assets'))
app.use('/Scripts', express.static('Scripts'))
app.use(express.static('Pages'))


app.use('/', publicRouter);
app.use('/private/', privateRouter);
app.use('/api/local/', routerLocal);
app.use('/api/pgs/', routerPgs);

const port = process.env.SERVER_PORT || 4242;
app.listen(port, () => {
    console.log('Express server listening on port', port)
});
