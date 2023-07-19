/*
  Warnings:

  - Added the required column `canceled_order_at` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmed_order_at` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_completed_at` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_started_at` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recepted_order_at` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "canceled_order_at" TIMESTAMPTZ(0) NOT NULL,
ADD COLUMN     "confirmed_order_at" TIMESTAMPTZ(0) NOT NULL,
ADD COLUMN     "delivery_completed_at" TIMESTAMPTZ(0) NOT NULL,
ADD COLUMN     "delivery_started_at" TIMESTAMPTZ(0) NOT NULL,
ADD COLUMN     "recepted_order_at" TIMESTAMPTZ(0) NOT NULL;
