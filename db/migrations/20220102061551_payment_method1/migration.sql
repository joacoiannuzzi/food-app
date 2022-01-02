/*
  Warnings:

  - Added the required column `name` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderItemDetailId` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasPayed` to the `OrderItemDetail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaymentMethod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "extraPaymentInfo" TEXT,
    "orderItemDetailId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "PaymentMethod_orderItemDetailId_fkey" FOREIGN KEY ("orderItemDetailId") REFERENCES "OrderItemDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PaymentMethod_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PaymentMethod" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "PaymentMethod";
DROP TABLE "PaymentMethod";
ALTER TABLE "new_PaymentMethod" RENAME TO "PaymentMethod";
CREATE TABLE "new_OrderItemDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "hasPayed" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    CONSTRAINT "OrderItemDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItemDetail_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItemDetail" ("createdAt", "id", "orderItemId", "quantity", "updatedAt", "userId") SELECT "createdAt", "id", "orderItemId", "quantity", "updatedAt", "userId" FROM "OrderItemDetail";
DROP TABLE "OrderItemDetail";
ALTER TABLE "new_OrderItemDetail" RENAME TO "OrderItemDetail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
