-- CreateTable
CREATE TABLE "Utilizador" (
    "id_utilizador" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Utilizador_pkey" PRIMARY KEY ("id_utilizador")
);

-- CreateTable
CREATE TABLE "Avaliar" (
    "id_avaliacao" SERIAL NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "produto" TEXT NOT NULL,
    "texto_comentario" TEXT NOT NULL,
    "data_avaliacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avaliar_pkey" PRIMARY KEY ("id_avaliacao")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id_produto" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "fabricante" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "Precos" (
    "id_preco" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "data_preco" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Precos_pkey" PRIMARY KEY ("id_preco")
);

-- CreateTable
CREATE TABLE "A_seguir" (
    "id_seguir" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "alerta_preco" BOOLEAN NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "id_lista" INTEGER NOT NULL,

    CONSTRAINT "A_seguir_pkey" PRIMARY KEY ("id_seguir")
);

-- CreateTable
CREATE TABLE "Lista_seguidos" (
    "id_lista" SERIAL NOT NULL,
    "id_utilizador" INTEGER NOT NULL,

    CONSTRAINT "Lista_seguidos_pkey" PRIMARY KEY ("id_lista")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id_categoria" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_email_key" ON "Utilizador"("email");

-- AddForeignKey
ALTER TABLE "Avaliar" ADD CONSTRAINT "Avaliar_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "Utilizador"("id_utilizador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliar" ADD CONSTRAINT "Avaliar_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Precos" ADD CONSTRAINT "Precos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "A_seguir" ADD CONSTRAINT "A_seguir_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "A_seguir" ADD CONSTRAINT "A_seguir_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "Utilizador"("id_utilizador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "A_seguir" ADD CONSTRAINT "A_seguir_id_lista_fkey" FOREIGN KEY ("id_lista") REFERENCES "Lista_seguidos"("id_lista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista_seguidos" ADD CONSTRAINT "Lista_seguidos_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "Utilizador"("id_utilizador") ON DELETE RESTRICT ON UPDATE CASCADE;
