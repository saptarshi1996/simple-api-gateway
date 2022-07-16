/*
  Warnings:

  - Added the required column `authenticationId` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `services` ADD COLUMN `authenticationId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_authenticationId_fkey` FOREIGN KEY (`authenticationId`) REFERENCES `authentications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
