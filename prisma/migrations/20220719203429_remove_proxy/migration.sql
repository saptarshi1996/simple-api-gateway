/*
  Warnings:

  - You are about to drop the `proxies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `proxies` DROP FOREIGN KEY `proxies_apiId_fkey`;

-- DropTable
DROP TABLE `proxies`;
