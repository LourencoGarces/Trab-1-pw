const authenticateUtil = require('../Utils/Autenticate.js'); // Import the authentication utility

module.exports = async (req, res, next) => {
    const accessToken = req.headers['authorization']; // Get the access token from the request headers

    if (!accessToken) {
        return res.status(401).send("Não está autorizado"); // If no token is provided, send an unauthorized response
    }

    try {
        const bearer = accessToken.split(' '); // Split the token to get the bearer part
        const bearerToken = bearer[1]; // Extract the token from the split result

        const result = await authenticateUtil.certifyAccessToken(bearerToken); // Verify the token
        req.body.loggedUserName = result.Name; // Attach the user's name to the request body

        return next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).send("Não está autorizado"); // If token verification fails, send an unauthorized response
    }
}
