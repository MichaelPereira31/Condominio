-- CreateTable
CREATE TABLE "lotes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "nome_sacado" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "linha_digitavel" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "lotesId" TEXT NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_lotesId_fkey" FOREIGN KEY ("lotesId") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
