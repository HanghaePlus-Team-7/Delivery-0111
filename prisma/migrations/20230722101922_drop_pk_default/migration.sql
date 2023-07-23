/*
  Warnings:

  - You are about to drop the column `code` on the `product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "product_code_key";

-- AlterTable
ALTER TABLE "bookmark" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "order_sheet" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "code",
ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "review" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "store" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT;
