const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Devolve todos as avaliar
exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.Avaliar.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//Devolve uma avaliar indicada por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id*1;
    try {
        //procura a avaliar com o id
        const response = await prisma.Avaliar.findUnique({
            where: {
                id_avaliar: id,
            },
        })
        //devolve o carro
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//Criar uma nova avaliar
exports.create = async (req, res) => {
    // Apanhar os dados enviados
    const {id_utilizador, id_produto, produto, texto_comentario, data_avaliacao} = req.body;

    try {
        // Criar uma nova avaliar
        const avaliar = await prisma.Avaliar.create({
            data: {
                id_utilizador: id_utilizador,
                id_produto: id_produto,   
                produto: produto,        
                texto_comentario: texto_comentario, 
                data_avaliacao: data_avaliacao 
            },
        });

        // Devolve a avaliar criada
        res.status(201).json(avaliar);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//Atualizar uma avaliar
exports.update = async (req, res) => {
    const {id, id_utilizador, id_produto, produto, texto_comentario, data_avaliacao} = req.body;

    try {
        //procurar a avaliar com id e atualizar os dados
        const avaliar = await prisma.Avaliar.update({
            where: {
                id_avaliacao: id*1,
            },
            data: {         
                id_utilizador: id_utilizador,
                id_produto: id_produto,   
                produto: produto,        
                texto_comentario: texto_comentario, 
                data_avaliacao: data_avaliacao 
            },
        })
        //devolve a avaliar atualizada
        res.status(200).json(avaliar)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//apagar a avaliar com id passado
exports.delete = async (req, res) => {
    //le o id da avaliar
    const id = req.params.id;
    try {
        //delete avaliar
        await prisma.Avaliar.delete({
            where: {
                id_avaliacao: id*1,
            },
        })
        //just return ok
        res.status(200).send("Apagada com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}