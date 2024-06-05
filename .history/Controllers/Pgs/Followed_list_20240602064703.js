const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Devolve todos as lista_seguidos
exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.Lista_seguidos.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//Devolve uma lista indicada por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id*1;
    try {
        //procura a lista com o id
        const response = await prisma.Lista_seguidos.findUnique({
            where: {
                id_lista: id,
            },
        })
        //devolve o carro
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//Criar uma nova lista
exports.create = async (req, res) => {
    // Apanhar os dados enviados
    const {id_utilizador} = req.body;

    try {
        // Criar uma nova lista
        const lista = await prisma.Lista_seguidos.create({
            data: {
                id_utilizador: id_utilizador
            },
        });

        // Devolve a lista criada
        res.status(201).json(lista);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//Atualizar uma lista
exports.update = async (req, res) => {
    const { id, id_utilizador } = req.body;

    try {
        //procurar a lista com id e atualizar os dados
        const lista = await prisma.Lista_seguidos.update({
            where: {
                id_lista: id*1,
            },
            data: {         
                id_utilizador: id_utilizador
            },
        })
        //devolve a lista atualizada
        res.status(200).json(lista)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//apagar a lista com id passado
exports.delete = async (req, res) => {
    //le o id da lista
    const id = req.params.id;
    try {
        //delete lista
        await prisma.Lista_seguidos.delete({
            where: {
                id_lista: id*1,
            },
        })
        //just return ok
        res.status(200).send("Apagada com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}