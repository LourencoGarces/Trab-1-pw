const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to get all products with optional filtering
const getAll = async (req, res) => {
    const { categoria, preco_min, preco_max, fabricante } = req.query;
    try {
        const filter = {};

        // Apply category filter if provided
        if (categoria) {
            filter.id_categoria = parseInt(categoria);
        }
        // Apply price range filter if provided
        if (preco_min || preco_max) {
            filter.preco = {};
            if (preco_min) {
                filter.preco.gte = parseFloat(preco_min);
            }
            if (preco_max) {
                filter.preco.lte = parseFloat(preco_max);
            }
        }
        // Apply manufacturer filter if provided
        if (fabricante) {
            filter.fabricante = fabricante;
        }

        // Fetch products from database with applied filters
        const response = await prisma.produtos.findMany({
            where: filter,
        });
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
};

// Function to get a product by its ID
const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await prisma.produtos.findUnique({
            where: { id_produto: id },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// Function to create a new product
const create = async (req, res) => {
    // Destructure the product data from the request body
    const { nome, descricao, imagem, preco, fabricante, categoria } = req.body;
    try {
        // Create a new product in the database with the provided data
        const newProduct = await prisma.Produtos.create({
            data: {
                nome: nome,
                descricao: descricao,
                preco: preco, 
                fabricante: fabricante,
                id_categoria: categoria, 
                imagem: imagem
            },
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Function to update a product
const update = async (req, res) => {
    // Destructure the product data from the request body
    const { id, nome, descricao, preco, fabricante, imagem, categoria } = req.body;
    try {
        // Update the product with the specified ID in the database
        const produto = await prisma.Produtos.update({
            where: {
                id_produto: parseInt(id),
            },
            data: {
                nome: nome,
                descricao: descricao,
                preco: preco, 
                fabricante: fabricante,
                id_categoria: categoria, 
                imagem: imagem
            },
        });
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.produtos.delete({
            where: { id_produto: id },
        });
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Function to get products by category
const getByCategory = async (req, res) => {
    const id_categoria = parseInt(req.params.categoria);
    try {
        const produtos = await prisma.produtos.findMany({
            where: { id_categoria },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to get products by image
const getByImage = async (req, res) => {
    const imagem = req.params.imagem;
    try {
        const produtos = await prisma.produtos.findMany({
            where: { imagem },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to get products by manufacturer
const getByManufacturer = async (req, res) => {
    const fabricante = req.params.fabricante;
    try {
        const produtos = await prisma.produtos.findMany({
            where: { fabricante },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to get products by price
const getByPrice = async (req, res) => {
    const preco = parseFloat(req.params.preco);
    try {
        const produtos = await prisma.produtos.findMany({
            where: { preco },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to get products by name
const getByName = async (req, res) => {
    const nome = req.params.nome;
    try {
        const produtos = await prisma.produtos.findMany({
            where: { nome },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to get products by category ID
const getByIdCategory = async (req, res) => {
    const id_categoria = parseInt(req.params.id_categoria);
    try {
        const produtos = await prisma.produtos.findMany({
            where: { id_categoria },
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to get products by details
const getByDetalhes = async (req, res) => {
    const descricao = req.params.detalhes;
    try {
        const response = await prisma.produtos.findUnique({
            where: { descricao },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// Function to save a product to the database
async function saveProduct(productData) {
    try {
        const categoria = await prisma.categorias.upsert({
            where: { descricao: productData.categoria },
            update: {},
            create: { descricao: productData.categoria },
        });

        const produto = await prisma.produtos.create({
            data: {
                nome: productData.nome,
                descricao: productData.descricao,
                preco: productData.preco,
                fabricante: productData.fabricante,
                imagem: productData.imagem,
                id_categoria: categoria.id_categoria,
            },
        });

        return produto;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to add a product to the wishlist
const addToWishlist = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        // Check if the user's wishlist already exists
        let listaSeguidos = await prisma.lista_seguidos.findFirst({
            where: { id_utilizador: parseInt(userId) }
        });

        // If it does not exist, create a new wishlist
        if (!listaSeguidos) {
            listaSeguidos = await prisma.lista_seguidos.create({
                data: {
                    id_utilizador: parseInt(userId)
                }
            });
        }

        // Add the product to the wishlist
        const wishlistItem = await prisma.a_seguir.create({
            data: {
                id_produto: parseInt(productId),
                alerta_preco: false, // Set as needed
                id_utilizador: parseInt(userId),
                id_lista: listaSeguidos.id_lista
            }
        });
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to get the wishlist items of a user
const getWishlist = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const wishlist = await prisma.a_seguir.findMany({
            where: { id_utilizador: userId },
            include: { Produtos: true }
        });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);
    try {
        await prisma.a_seguir.deleteMany({
            where: {
                id_utilizador: userId,
                id_produto: productId
            }
        });
        res.status(200).json({ msg: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteProduct,
    getByCategory,
    getByImage,
    getByManufacturer,
    getByPrice,
    getByName,
    getByIdCategory,
    getByDetalhes,
    addToWishlist,
    getWishlist,
    removeFromWishlist
};
