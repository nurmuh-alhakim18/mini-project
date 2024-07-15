/*
  Warnings:

  - You are about to drop the column `oraganizerId` on the `event` table. All the data in the column will be lost.
  - Added the required column `organizerId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_oraganizerId_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `oraganizerId`,
    ADD COLUMN `organizerId` INTEGER NOT NULL,
    MODIFY `startTime` VARCHAR(191) NOT NULL,
    MODIFY `endTime` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_organizerId_fkey` FOREIGN KEY (`organizerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
