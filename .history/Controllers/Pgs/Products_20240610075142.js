const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const response = await prisma.produtos.findMany();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
};

// Function to get a product by ID
exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = parseInt(req.params.id);

    try {
        // Find the product with the given ID
        const response = await prisma.produtos.findUnique({
            where: {
                id_produto: id,
            },
        });
        // Send the response with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}

// Function to create a new product
exports.create = async (req, res) => {
    // Get the data from the request body
    const { nome, descricao, imagem, preco, fabricante, id_categoria } = req.body;


    try {
        const newProduct = await prisma.produtos.create({
            data: {
                nome,
                detalhes,
                descricao,
                imagem,
                preco,
                fabricante,
                id_categoria
            }
        });
        // Send the created product with status 201 (Created)
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to update a product
exports.update = async (req, res) => {
    // Get the data from the request body
    const { id, nome, descricao, preco, fabricante, id_categoria, imagem } = req.body;

    try {
        // Find the product by ID and update with new data
        const produto = await prisma.produtos.update({
            where: {
                id_produto: parseInt(id),
            },
            data: {
                nome,
                detalhes,
                descricao,
                imagem,
                preco,
                fabricante,
                id_categoria
            },
        });
        // Send the updated product with status 200 (OK)
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to delete a product by ID
exports.delete = async (req, res) => {
    // Get the ID from the request parameters
    const id = parseInt(req.params.id);
    try {
        // Delete the product with the given ID
        await prisma.produtos.delete({
            where: {
                id_produto: id,
            },
        });
        // Send a success message with status 200 (OK)
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

// Function to get products by category
exports.getProductsByCategory = async (req, res) => {
    const category = parseInt(req.params.category);
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                id_categoria: category
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Function to get Products by Image
exports.getProductsByImage = async (req, res) => {
    const image = req.params.image;
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                imagem: image
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Function to get Products by Manufacturer
exports.getProductsByManufacturer = async (req, res) => {
    const manufacturer = req.params.manufacturer;
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                fabricante: manufacturer
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Function to get Products by Price
exports.getProductsByPrice = async (req, res) => {
    const price = parseFloat(req.params.price);
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                preco: price
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Function to get Products by Name
exports.getProductsByName = async (req, res) => {
    const name = req.params.name;
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                nome: name
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Function to get Products by ID Category
exports.getProductsByIdCategory = async (req, res) => {
    const id_category = parseInt(req.params.id_category);
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                id_categoria: id_category
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
//Fuction to get Products by Detalhes
exports.getProductsByDetalhes = async (req, res) => {
    const detalhes = req.params.detalhes;
    try {
        const produtos = await prisma.produtos.findMany({
            where: {
                detalhes: detalhes
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

