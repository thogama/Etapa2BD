/*
  Warnings:

  - Made the column `caixa` on table `banco` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cliente_id` on table `conta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banco_id` on table `conta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `saldo` on table `conta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "banco" ALTER COLUMN "caixa" SET NOT NULL;

-- AlterTable
ALTER TABLE "conta" ALTER COLUMN "cliente_id" SET NOT NULL,
ALTER COLUMN "banco_id" SET NOT NULL,
ALTER COLUMN "saldo" SET NOT NULL;
