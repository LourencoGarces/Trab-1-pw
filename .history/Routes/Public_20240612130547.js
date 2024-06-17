const publicRouter = require('express').Router();

publicRouter.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Login-explore.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

module.exports = publicRouter;