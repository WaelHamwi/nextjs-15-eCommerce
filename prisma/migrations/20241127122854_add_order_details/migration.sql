-- DropForeignKey
ALTER TABLE `orderdetails` DROP FOREIGN KEY `orderdetails_ibfk_1`;

-- DropForeignKey
ALTER TABLE `orderdetails` DROP FOREIGN KEY `orderdetails_ibfk_2`;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
