const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Devolve todos as categorias
exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.Categorias.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//Devolve uma categoria indicada por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id*1;
    try {
        //procura a categoria com o id
        const response = await prisma.Categorias.findUnique({
            where: {
                id_categoria: id,
            },
        })
        //devolve o carro
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//Criar uma nova categoria
exports.create = async (req, res) => {
    // Apanhar os dados enviados
    const { descricao } = req.body;

    try {
        // Criar uma nova categoria
        const categoria = await prisma.Categorias.create({
            data: {
                descricao: descricao
            },
        });

        // Devolve a categoria criada
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//Atualizar uma categoria
exports.update = async (req, res) => {
    const { id, descricao } = req.body;

    console.log(req.body)

    try {
        //procurar a categoria com id e atualizar os dados
        const categoria = await prisma.Categorias.update({
            where: {
                id_categoria: id*1,
            },
            data: {         
                descricao: descricao
            },
        })
        //devolve a categoria atualizada
        res.status(200).json(categoria)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//apagar a categoria com id passado
exports.delete = async (req, res) => {
    //le o id da categoria
    const id = req.params.id;
    try {
        //delete categoria
        await prisma.Categorias.delete({
            where: {
                id_categoria: id*1,
            },
        })
        //just return ok
        res.status(200).send("Apagada com sucesso!");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}