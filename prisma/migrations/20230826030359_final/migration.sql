/*
  Warnings:

  - You are about to drop the `aluno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "aluno";

-- CreateTable
CREATE TABLE "banco" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "caixa" DOUBLE PRECISION,

    CONSTRAINT "banco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conta" (
    "cliente_id" INTEGER,
    "banco_id" INTEGER,
    "id" SERIAL NOT NULL,
    "saldo" DOUBLE PRECISION,

    CONSTRAINT "conta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nome_unique" ON "banco"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "cpf_unique" ON "cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "conta_cliente_id_banco_id_key" ON "conta"("cliente_id", "banco_id");

-- AddForeignKey
ALTER TABLE "conta" ADD CONSTRAINT "conta_banco_id_fkey" FOREIGN KEY ("banco_id") REFERENCES "banco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conta" ADD CONSTRAINT "conta_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
