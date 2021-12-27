/*
  Warnings:

  - You are about to drop the `OrderItemDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrderItemDetails";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OrderItemDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
