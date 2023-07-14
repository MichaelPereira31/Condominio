-- CreateTable
CREATE TABLE "batch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "external_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "name_withdrawn" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "digitable_line" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "batchId" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "batch_name_key" ON "batch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "batch_external_id_key" ON "batch"("external_id");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batch"("external_id") ON DELETE RESTRICT ON UPDATE CASCADE;
