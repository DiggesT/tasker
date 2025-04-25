-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "serialNumber" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_serialNumber_key" ON "Task"("serialNumber");
