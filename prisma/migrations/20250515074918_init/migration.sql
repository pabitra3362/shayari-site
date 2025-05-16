/*
  Warnings:

  - You are about to drop the `_shayariTouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_shayariTouser" DROP CONSTRAINT "_shayariTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_shayariTouser" DROP CONSTRAINT "_shayariTouser_B_fkey";

-- DropTable
DROP TABLE "_shayariTouser";

-- CreateTable
CREATE TABLE "_LikedByUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LikedByUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BookmarkedByUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookmarkedByUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LikedByUsers_B_index" ON "_LikedByUsers"("B");

-- CreateIndex
CREATE INDEX "_BookmarkedByUsers_B_index" ON "_BookmarkedByUsers"("B");

-- AddForeignKey
ALTER TABLE "_LikedByUsers" ADD CONSTRAINT "_LikedByUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "shayari"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedByUsers" ADD CONSTRAINT "_LikedByUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkedByUsers" ADD CONSTRAINT "_BookmarkedByUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "shayari"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkedByUsers" ADD CONSTRAINT "_BookmarkedByUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
