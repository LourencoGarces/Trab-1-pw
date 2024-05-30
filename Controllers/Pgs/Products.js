const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Devolve todos os produtos
exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.Produtos.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//Devolve um produto indicado por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id*1;
    
    try {
        //procura o produto com o id
        const response = await prisma.Produtos.findUnique({
            where: {
                id_produto: id,
            },
        })
        //devolve o carro
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//Criar um novo produto
exports.create = async (req, res) => {
    // Apanhar os dados enviados
    const {nome, descricao, preco, fabricante, categoria} = req.body;

    try {
        // Criar um novo produto
        const produto = await prisma.Produtos.create({
            data: {
                nome: nome,
                descricao: descricao,
                preco: preco, 
                fabricante: fabricante,
                id_categoria: categoria 
            },
        });

        // Devolve o produto criado
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//Atualizar um produto
exports.update = async (req, res) => {
    const { id, nome, descricao, preco, fabricante, categoria} = req.body;

    try {
        //procurar o produto com id e atualizar os dados
        const produto = await prisma.Produtos.update({
            where: {
                id_produto: id*1,
            },
            data: {
                nome: nome,           
                descricao: descricao,
                preco: preco,
                fabricante: fabricante,
                id_categoria: categoria
            },
        })
        //devolve o produto atualizado
        res.status(200).json(produto)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//apagar o produto com id passado
exports.delete = async (req, res) => {
    //le o id do produto
    const id = req.params.id;
    try {
        //delete student
        await prisma.Produtos.delete({
            where: {
                id_produto: id*1,
            },
        })
        //just return ok
        res.status(200).send("Apagado com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}