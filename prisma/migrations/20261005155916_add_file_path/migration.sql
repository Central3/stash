/*
  Warnings:

  - Added the required column `destination` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
