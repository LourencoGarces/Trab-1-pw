const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Function to get all users
exports.getAll = async (req, res) => {
    try {
        // Read all records from the 'Utilizador' table
        const response = await prisma.Utilizador.findMany();
        res.status(200).json(response); // Send the response with status 200 (OK)
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get a user by ID
exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    try {
        // Find the user with the given ID
        const response = await prisma.Utilizador.findUnique({
            where: {
                id_utilizador: id,
            },
        });
        // Send the user with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}

// Function to create a new user
exports.create = async (req, res) => {
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
                nome,
                email,
                contacto,
                password,
                isAdmin
            },
        });

        // Return the created user with status 201 (Created)
        res.status(201).json(utilizador);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to update a user
exports.update = async (req, res) => {
    // Get the data from the request body
    const { id_utilizador, nome, email, contacto, password, isAdmin } = req.body;

    try {
        // Find the user by ID and update with new data
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
        // Send the updated user with status 200 (OK)
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to delete a user by ID
exports.delete = async (req, res) => {
    // Get the ID from the request parameters
    const id = parseInt(req.params.id);
    try {
        // Delete the user with the given ID
        await prisma.Utilizador.delete({
            where: {
                id_utilizador: id,
            },
        });
        // Just return ok with status 200 (OK)
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to login user
exports.login = async (req, res) => {
    // Get the email and password from the request body
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await prisma.Utilizador.findUnique({
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
        res.status(500).json({ msg: "An error occurred. Please try again later." }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get user by email
exports.getUserByEmail = async (req, res) => {
    // Get the email from the request parameters
    const userEmail = req.params.email;

    try {
        // Find user by email
        const user = await prisma.Utilizador.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" }); // Send error message with status 404 (Not Found)
        }

        // Return user data with status 200 (OK)
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ msg: "Internal server error" }); // Send error message with status 500 (Internal Server Error)
    }
}
//Function to changepassword
exports.changepassword = async (req, res) => {
    // Get the data from the request body
    const { id_utilizador, password } = req.body;

    try {
        // Find the user by ID and update with new data
        const utilizador = await prisma.Utilizador.update({
            where: {
                id_utilizador: id_utilizador,
            },
            data: {
                password,
            },
        });
        // Send the updated user with status 200 (OK)
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}
//Function to forgotpassword
exports.forgotpassword = async (req, res) => {
    // Get the data from the request body
    const { email } = req.body;

    try {
        // Find the user by ID and update with new data
        const utilizador = await prisma.Utilizador.findUnique({
            where: {
                email: email,
            },
        });
        // Send the updated user with status 200 (OK)
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}
//Function to resetpassword
exports.resetpassword = async (req, res) => {
    // Get the data from the request body
    const { id_utilizador, password } = req.body;

    try {
        // Find the user by ID and update with new data
        const utilizador = await prisma.Utilizador.update({
            where: {
                id_utilizador: id_utilizador,
            },
            data: {
                password,
            },
        });
        // Send the updated user with status 200 (OK)
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

