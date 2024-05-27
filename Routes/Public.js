const publicRouter = require('express').Router();

/*publicRouter.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Index.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});*/

publicRouter.get('/about_us', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'AboutUs.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/common_questions', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'CommonQuestions.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/contacts', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Contacts.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/help', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Help.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Login.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/register', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Register.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

module.exports = publicRouter;