/*
  Warnings:

  - You are about to drop the column `time` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "time";

-- DropEnum
DROP TYPE "Role";
