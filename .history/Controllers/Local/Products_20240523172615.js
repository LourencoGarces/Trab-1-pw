const fs = require('fs');

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
                id: id,
            },
        })
        //devolve o produto
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//criar um produto
exports.create = async (req, res) => {
    //apanhar os dados enviados
    const { nome, descricao, preco, fabricante } = req.body;
    try {
        //criar um novo produto
        const produto = await prisma.Produtos.create({
            data: {
                nome: nome,           
                descricao: descricao,
                preco: preco,
                fabricante: fabricante
            },
        })
        //devolve o produto criado
        res.status(201).json(produto)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//Atualizar um produto
exports.update = async (req, res) => {
    const { id, nome, descricao, preco, fabricante } = req.body;
    try {
        //procurar o produto com id e atualizar os dados
        const produto = await prisma.Produtos.update({
            where: {
                id: id*1,
            },
            data: {
                nome: nome,           
                descricao: descricao,
                preco: preco,
                fabricante: fabricante
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
                id: id*1,
            },
        })
        //just return ok
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}