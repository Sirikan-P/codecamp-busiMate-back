/*
  Warnings:

  - You are about to drop the column `address` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `log` on the `user_address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_address` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Made the column `wallet` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `driverId` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_address` DROP FOREIGN KEY `user_address_userId_fkey`;

-- DropIndex
DROP INDEX `user_address_userId_fkey` ON `user_address`;

-- AlterTable
ALTER TABLE `admin` ADD COLUMN `profileimage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `driver` DROP COLUMN `address`,
    DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    DROP COLUMN `lat`,
    DROP COLUMN `long`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `profileImageUrl` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'driver',
    MODIFY `idCard` VARCHAR(191) NULL,
    MODIFY `car_reg_no` VARCHAR(191) NULL,
    MODIFY `carType` ENUM('SEETS_4', 'SEETS_7', 'SEETS_9') NULL,
    MODIFY `hasWheelChair` ENUM('HAVE', 'NOHAVE') NULL DEFAULT 'NOHAVE',
    MODIFY `wallet` DECIMAL(65, 30) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `report` ADD COLUMN `topic` VARCHAR(191) NULL,
    MODIFY `message` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `review` ADD COLUMN `driverId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `addressId`,
    ADD COLUMN `profileImage` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `user_address` DROP COLUMN `log`,
    DROP COLUMN `userId`,
    ADD COLUMN `long` DECIMAL(65, 30) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL DEFAULT 'USE',
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `address` VARCHAR(191) NULL DEFAULT 'HOME',
    MODIFY `lat` DECIMAL(65, 30) NULL;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderUserId` INTEGER NULL,
    `senderDriverId` INTEGER NULL,
    `receiverUserId` INTEGER NULL,
    `receiverDriverId` INTEGER NULL,
    `bookingId` INTEGER NOT NULL,
    `text` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `Message_bookingId_key`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `driver_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NULL DEFAULT 'HOME',
    `lat` DECIMAL(65, 30) NULL,
    `long` DECIMAL(65, 30) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'USE',
    `driverId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `driver_wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `driverId` INTEGER NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `type` ENUM('INCOME', 'OUTCOME') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `user_address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderUserId_fkey` FOREIGN KEY (`senderUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderDriverId_fkey` FOREIGN KEY (`senderDriverId`) REFERENCES `driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverUserId_fkey` FOREIGN KEY (`receiverUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverDriverId_fkey` FOREIGN KEY (`receiverDriverId`) REFERENCES `driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `driver_address` ADD CONSTRAINT `driver_address_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `driver_wallet` ADD CONSTRAINT `driver_wallet_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
