const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

const secret = process.env.JWT_SECRET; // Retrieve the secret key from environment variables

// Function to generate an access token
// Takes 'information' as payload and signs it with the secret key
// Token expires in 1 day
exports.generateAccessToken = information => jwt.sign(information, secret, { expiresIn: '1d' });

// Function to verify the access token
// Takes 'token' and returns a promise
// Resolves with decoded token if verification is successful, otherwise rejects with error
exports.certifyAccessToken = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err); // Reject the promise with an error if verification fails
            } else {
                resolve(decoded); // Resolve the promise with the decoded token if verification is successful
            }
        });
    });
}
