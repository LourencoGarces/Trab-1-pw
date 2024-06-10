const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Function to get all products
exports.getAll = async (req, res) => {
    try {
        // Read all records from the 'Produtos' table
        const response = await prisma.Produtos.findMany();
        res.status(200).json(response); // Send the response with status 200 (OK)
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send error message with status 500 (Internal Server Error)
    }
}

// Function to get a product by ID
exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    
    try {
        // Find the product with the given ID
        const response = await prisma.Produtos.findUnique({
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
    const { nome, descricao, preco, fabricante, categoria } = req.body;

    try {
        // Create a new product with the given data
        const produto = await prisma.Produtos.create({
            data: {
                nome: nome,
                descricao: descricao,
                preco: preco, 
                fabricante: fabricante,
                id_categoria: categoria 
            },
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
    const { id, nome, descricao, preco, fabricante, categoria } = req.body;

    try {
        // Find the product by ID and update with new data
        const produto = await prisma.Produtos.update({
            where: {
                id_produto: id * 1,
            },
            data: {
                nome: nome,
                descricao: descricao,
                preco: preco,
                fabricante: fabricante,
                id_categoria: categoria
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
    const id = req.params.id;
    try {
        // Delete the product with the given ID
        await prisma.Produtos.delete({
            where: {
                id_produto: id * 1,
            },
        });
        // Send a success message with status 200 (OK)
        res.status(200).send("Apagado com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

exports.getByCategory = async (req, res) => {
    // Get the ID from the request parameters
    const categoria = req.params.categoria * 1;
    
    try {
        // Find products with the given category ID
        const response = await prisma.Produtos.findMany({
            where: {
                id_categoria: categoria, // Use id_categoria se for o nome correto da chave
            },
        });
        // Send the response with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
}
//Function to get Products by Image
exports.getProductsByImage = async (req, res) => {
    const image = req.params.image;
    try {
        const produtos = await prisma.produtos.findMan
            where: {
                imagem: image
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

//Function to get Products by Manufacturer
exports.getProductsByManufacturer = async (req, res) =
    const manufacturer = req.params.manufacturer;
    try {
        const produtos = await prisma.produtos.findMan
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
        const produtos = await prisma.produtos.findMan
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
        const produtos = await prisma.produtos.findMan
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
exports.getProductsByIdCategory = async (req, res) => 
    const id_category = parseInt(req.params.id_categor
    try {
        const produtos = await prisma.produtos.findMan
            where: {
                id_categoria: id_category
            }
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


