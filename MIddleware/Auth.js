const authenticateUtil = require('../Utils/Autenticate.js');

module.exports = async (req, res, next) => {
    const accessToken = req.headers['authorization']; // req.headers['x-access-token'];

    if (!accessToken) {
        return res.status(401).send("Não está autorizado");
    }

    try {
        const bearer = accessToken.split(' ');
        const bearerToken = bearer[1];

        const result = await authenticateUtil.certifyAccessToken(bearerToken);
        req.body.loggedUserName = result.Name;

        return next();
    } catch (err) {
        return res.status(401).send("Não está autorizado");
    }
}
