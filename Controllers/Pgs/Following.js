const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Devolve todos as A_seguir
exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.A_seguir.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//Devolve uma seguidos indicada por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id*1;
    try {
        //procura a seguidos com o id
        const response = await prisma.A_seguir.findUnique({
            where: {
                id_seguir: id,
            },
        })
        //devolve o carro
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//Criar uma nova seguidos
exports.create = async (req, res) => {
    // Apanhar os dados enviados
    const {id_produto, alerta_preco, id_utilizador, id_lista} = req.body;

    try {
        // Criar uma nova seguidos
        const seguidos = await prisma.A_seguir.create({
            data: {
                id_produto: id_produto,
                alerta_preco: alerta_preco,
                id_utilizador: id_utilizador,
                id_lista: id_lista
            },
        });

        // Devolve a seguidos criada
        res.status(201).json(seguidos);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//Atualizar uma seguidos
exports.update = async (req, res) => {
    const { id, id_produto, alerta_preco, id_utilizador, id_lista} = req.body;

    try {
        //procurar a seguidos com id e atualizar os dados
        const seguidos = await prisma.A_seguir.update({
            where: {
                id_seguir: id*1,
            },
            data: {         
                id_produto: id_produto,
                alerta_preco: alerta_preco,
                id_utilizador: id_utilizador,
                id_lista: id_lista
            },
        })
        //devolve a seguidos atualizada
        res.status(200).json(seguidos)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//apagar seguidos com id passado
exports.delete = async (req, res) => {
    //le o id da seguidos
    const id = req.params.id;
    try {
        //delete seguidos
        await prisma.A_seguir.delete({
            where: {
                id_seguir: id*1,
            },
        })
        //just return ok
        res.status(200).send("Apagado com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}