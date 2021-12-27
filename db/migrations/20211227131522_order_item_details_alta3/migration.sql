/*
  Warnings:

  - Added the required column `orderItemId` to the `OrderItemDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderItemDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `OrderItemDetail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItemDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    CONSTRAINT "OrderItemDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItemDetail_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItemDetail" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "OrderItemDetail";
DROP TABLE "OrderItemDetail";
ALTER TABLE "new_OrderItemDetail" RENAME TO "OrderItemDetail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
