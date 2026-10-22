/*
  Warnings:

  - You are about to drop the column `destination` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.
  - Added the required column `storagePath` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "destination",
DROP COLUMN "fileName",
DROP COLUMN "path",
ADD COLUMN     "storagePath" TEXT NOT NULL;
