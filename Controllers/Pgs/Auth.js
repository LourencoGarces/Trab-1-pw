const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../Utils/Autenticate.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.Utilizador.findUnique({
            where: { email: email },
        });

        if (user) {
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (passwordIsValid) {
                const role = user.isAdmin ? 'admin' : 'user';
                
                const payload = { 
                    id: user.id_utilizador, 
                    nome: user.nome, 
                    email: user.email,
                    contacto: user.contacto, 
                    isAdmin: user.isAdmin 
                };

                const accessToken = authenticateUtil.generateAccessToken(payload);

                res.status(200).json({ nome: user.nome, email: user.email, token: accessToken, role: role });
            } else {
                res.status(401).json({ msg: "Invalid password!" });
            }
        } else {
            res.status(401).json({ msg: "User not found!" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
};


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
                password: bcrypt.hashSync(password, 8),
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

exports.readToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ msg: 'Token is required' });
        }

        const decoded = await authenticateUtil.certifyAccessToken(token);

        const id_utilizador = decoded.id_utilizador;
        const nome = decoded.nome;
        const email = decoded.email;
        const contacto = decoded.contacto;
        const isAdmin = decoded.isAdmin ? 'admin' : 'user';

        res.status(200).json({ id_utilizador, nome, email, contacto, isAdmin });
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }
};


