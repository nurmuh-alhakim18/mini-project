/*
  Warnings:

  - You are about to drop the column `description` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `discountPrice` on the `transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountPercentage` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `description`,
    DROP COLUMN `discount`,
    DROP COLUMN `name`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `discountPercentage` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `discountPrice`,
    ADD COLUMN `discountAmount` DOUBLE NULL,
    ADD COLUMN `discountPercentage` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Promotion_code_key` ON `Promotion`(`code`);
