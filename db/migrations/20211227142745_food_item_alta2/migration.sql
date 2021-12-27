/*
  Warnings:

  - Added the required column `name` to the `FoodItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `FoodItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodItemId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FoodItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "description" TEXT,
    "restaurantId" INTEGER NOT NULL,
    CONSTRAINT "FoodItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FoodItem" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "FoodItem";
DROP TABLE "FoodItem";
ALTER TABLE "new_FoodItem" RENAME TO "FoodItem";
CREATE TABLE "new_OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "description" TEXT,
    "orderId" INTEGER NOT NULL,
    "foodItemId" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("createdAt", "description", "id", "orderId", "updatedAt") SELECT "createdAt", "description", "id", "orderId", "updatedAt" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
