/*
  Warnings:

  - You are about to drop the column `date` on the `Journal` table. All the data in the column will be lost.
  - Added the required column `day` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Journal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Journal" ("createdAt", "favorite", "id", "text", "title", "updatedAt", "userId") SELECT "createdAt", "favorite", "id", "text", "title", "updatedAt", "userId" FROM "Journal";
DROP TABLE "Journal";
ALTER TABLE "new_Journal" RENAME TO "Journal";
CREATE UNIQUE INDEX "Journal_id_key" ON "Journal"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
