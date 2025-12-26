-- Garante que a coluna date exista sem quebrar se já existir/for diferente
ALTER TABLE "Transaction"
ADD COLUMN IF NOT EXISTS "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
