/*
  Warnings:

  - The primary key for the `bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `bookmark` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `order_sheet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `order_sheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `code` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `store` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `user_id` on the `bookmark` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `store_id` on the `bookmark` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `product_id` on the `cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `store_id` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `order_id` on the `order_sheet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `product_id` on the `order_sheet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `store_id` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `store_id` on the `review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_store_id_fkey";

-- DropForeignKey
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_product_id_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_store_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_sheet" DROP CONSTRAINT "order_sheet_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_sheet" DROP CONSTRAINT "order_sheet_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_store_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_store_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- AlterTable
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_pkey",
ADD COLUMN     "created_at" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
DROP COLUMN "store_id",
ADD COLUMN     "store_id" UUID NOT NULL,
ADD CONSTRAINT "bookmark_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
ADD COLUMN     "created_at" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
DROP COLUMN "product_id",
ADD COLUMN     "product_id" UUID NOT NULL,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order" DROP CONSTRAINT "order_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
DROP COLUMN "store_id",
ADD COLUMN     "store_id" UUID NOT NULL,
ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order_sheet" DROP CONSTRAINT "order_sheet_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "order_id",
ADD COLUMN     "order_id" UUID NOT NULL,
DROP COLUMN "product_id",
ADD COLUMN     "product_id" UUID NOT NULL,
ADD CONSTRAINT "order_sheet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "code",
ADD COLUMN     "code" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "store_id",
ADD COLUMN     "store_id" UUID NOT NULL,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "review" DROP CONSTRAINT "review_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
DROP COLUMN "store_id",
ADD COLUMN     "store_id" UUID NOT NULL,
ADD CONSTRAINT "review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "store" DROP CONSTRAINT "store_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "store_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "bookmark_created_at_idx" ON "bookmark"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "bookmark_store_id_user_id_key" ON "bookmark"("store_id", "user_id");

-- CreateIndex
CREATE INDEX "cart_created_at_idx" ON "cart"("created_at");

-- CreateIndex
CREATE INDEX "order_created_at_idx" ON "order"("created_at");

-- CreateIndex
CREATE INDEX "order_sheet_created_at_idx" ON "order_sheet"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "product_code_key" ON "product"("code");

-- CreateIndex
CREATE INDEX "product_created_at_idx" ON "product"("created_at");

-- CreateIndex
CREATE INDEX "review_created_at_idx" ON "review"("created_at");

-- CreateIndex
CREATE INDEX "store_created_at_idx" ON "store"("created_at");

-- CreateIndex
CREATE INDEX "user_created_at_idx" ON "user"("created_at");

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_sheet" ADD CONSTRAINT "order_sheet_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_sheet" ADD CONSTRAINT "order_sheet_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
