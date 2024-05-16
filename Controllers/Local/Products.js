const fs = require('fs');

//Devolve todos os carros
exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.Produtos.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//Devolve um carro indicado por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id*1;
    try {
        //procura o carro com o id
        const response = await prisma.Produtos.findUnique({
            where: {
                id: id,
            },
        })
        //devolve o carro
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//criar um carro
exports.create = async (req, res) => {
    //apanhar os dados enviados
    const { nome, descricao, preco, fabricante } = req.body;
    try {
        //criar um novo carro
        const produto = await prisma.Produtos.create({
            data: {
                nome: nome,           
                descricao: descricao,
                preco: preco,
                fabricante: fabricante
            },
        })
        //devolve o carro criado
        res.status(201).json(produto)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//Atualizar um carro
exports.update = async (req, res) => {
    const { id, nome, descricao, preco, fabricante } = req.body;
    try {
        //procurar o carro com id e atualizar os dados
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
        //devolve o carro atualizado
        res.status(200).json(produto)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//apagar o carro com id passado
exports.delete = async (req, res) => {
    //le o id do carro
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