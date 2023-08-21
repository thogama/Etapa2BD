-- CreateTable
CREATE TABLE "aluno" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "idade" INTEGER,
    "curso" VARCHAR(255),

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);
