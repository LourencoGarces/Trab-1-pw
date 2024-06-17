const bcrypt = require('bcryptjs/dist/bcrypt'); // Import bcrypt for password hashing
const authenticateUtil = require('../../Utils/Autenticate.js'); // Import the authentication utility

const { PrismaClient } = require('@prisma/client'); // Import Prisma client
const prisma = new PrismaClient(); // Create a new instance of Prisma client

// Sign in function
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body
        const user = await prisma.Utilizador.findUnique({
            where: { email: email },
        }); // Find user by email

        if (user) {
            const passwordIsValid = bcrypt.compareSync(password, user.password); // Compare provided password with stored password
            if (passwordIsValid) {
                const role = user.isAdmin ? 'admin' : 'user'; // Determine user role

                const payload = { 
                    id: user.id_utilizador, 
                    nome: user.nome, 
                    email: user.email,
                    contacto: user.contacto, 
                    isAdmin: user.isAdmin 

                };


                const accessToken = authenticateUtil.generateAccessToken(payload); // Generate access token

                res.status(200).json({ nome: user.nome, email: user.email, token: accessToken, role: role }); // Send response with user data and token
            } else {
                res.status(401).json({ msg: "Invalid password!" }); // Send response for invalid password
            }
        } else {
            res.status(401).json({ msg: "User not found!" }); // Send response for user not found
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" }); // Send response for internal server error
    }
};

// Sign up function
exports.signup = async (req, res) => {
    // Get the data from the request body
    const { nome, email, contacto, password, isAdmin } = req.body;

    // Validate required fields
    if (!nome || !email || !contacto || !password) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        // Check if the email already exists
        const existingUser = await prisma.Utilizador.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use." });
        }

        // Create a new user with the given data
        const utilizador = await prisma.Utilizador.create({
            data: {
                nome: nome,
                email: email,
                contacto: contacto,
                password: bcrypt.hashSync(password, 8), // Hash the password
                isAdmin: isAdmin
            },
        });

        // Return the created user with status 201 (Created)
        res.status(201).json(utilizador);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to read and verify token
exports.readToken = async (req, res) => {
    try {
        const { token } = req.body; // Extract token from request body

        if (!token) {
            return res.status(400).json({ msg: 'Token is required' }); // Send response if token is not provided
        }

        const decoded = await authenticateUtil.certifyAccessToken(token); // Verify the token

        // Extract user information from the decoded token
        const id_utilizador = decoded.id_utilizador;
        const nome = decoded.nome;
        const email = decoded.email;
        const contacto = decoded.contacto;
        const isAdmin = decoded.isAdmin ? 'admin' : 'user';

        // Send response with user information
        res.status(200).json({ id_utilizador, nome, email, contacto, isAdmin });
    } catch (error) {
        res.status(401).json({ msg: error.message }); // Send response for invalid or expired token
    }
};
