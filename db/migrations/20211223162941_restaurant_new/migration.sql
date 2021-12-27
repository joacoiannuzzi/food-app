/*
  Warnings:

  - Added the required column `email` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT
);
INSERT INTO "new_Restaurant" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "description" TEXT,
    "closesAt" DATETIME NOT NULL,
    "finalized" BOOLEAN NOT NULL DEFAULT false,
    "restaurantId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("closesAt", "createdAt", "description", "finalized", "id", "updatedAt", "userId") SELECT "closesAt", "createdAt", "description", "finalized", "id", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
