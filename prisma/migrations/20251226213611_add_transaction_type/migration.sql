-- 1. Criar o ENUM
CREATE TYPE "TransactionType" AS ENUM ('IN', 'OUT');

-- 2. Adicionar a coluna TEMPORARIAMENTE como NULL
ALTER TABLE "Transaction"
ADD COLUMN "type" "TransactionType";

-- 3. Preencher registros existentes
UPDATE "Transaction"
SET "type" = 'IN'
WHERE "type" IS NULL;

-- 4. Tornar a coluna obrigatória
ALTER TABLE "Transaction"
ALTER COLUMN "type" SET NOT NULL;
