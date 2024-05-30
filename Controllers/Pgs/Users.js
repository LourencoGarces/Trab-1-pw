const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Devolve todos os utilizadores
exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.Utilizador.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Devolve um utilizador indicado por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id*1;
    try {
        //procura o utilizador com o id
        const response = await prisma.Utilizador.findUnique({
            where: {
                id_utilizador: id,
            },
        });
        //devolve o utilizador
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

exports.create = async (req, res) => {
    const { nome, email, contacto, password, isAdmin } = req.body;

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

        // Create a new user
        const utilizador = await prisma.Utilizador.create({
            data: {
                nome,
                email,
                contacto,
                password,
                isAdmin
            },
        });

        // Return the created user
        res.status(201).json(utilizador);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: error.message });
    }
}

//Atualizar um utilizador
exports.update = async (req, res) => {
    const { id_utilizador, nome, email, contacto, password, isAdmin } = req.body;

    try {
        //procurar o utilizador com id e atualizar os dados
        const utilizador = await prisma.Utilizador.update({
            where: {
                id_utilizador: id_utilizador,
            },
            data: {
                nome,
                email,
                contacto,
                password,
                isAdmin
            },
        });
        //devolve o utilizador atualizado
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//apagar o utilizador com id passado
exports.delete = async (req, res) => {
    //le o id do utilizador
    const id = parseInt(req.params.id);
    try {
        //delete utilizador
        await prisma.Utilizador.delete({
            where: {
                id_utilizador: id,
            },
        });
        //just return ok
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        const user = await prisma.utilizador.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Check if the password matches
        if (password !== user.password) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Return success with user role
        res.status(200).json({ msg: "Login successful", role: user.isAdmin ? 'admin' : 'user' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "An error occurred. Please try again later." });
    }
}

// Get the User by Email
exports.getUserByEmail = async (req, res) => {
    const userEmail = req.params.email;

    try {
        const user = await prisma.Utilizador.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Return user data
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
