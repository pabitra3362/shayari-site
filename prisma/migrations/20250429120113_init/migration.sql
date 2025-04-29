/*
  Warnings:

  - You are about to drop the `Shayari` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Shayari";

-- CreateTable
CREATE TABLE "shayari" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shayari_pkey" PRIMARY KEY ("id")
);
