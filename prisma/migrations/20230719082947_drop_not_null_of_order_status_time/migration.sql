-- AlterTable
ALTER TABLE "order" ALTER COLUMN "canceled_order_at" DROP NOT NULL,
ALTER COLUMN "confirmed_order_at" DROP NOT NULL,
ALTER COLUMN "delivery_completed_at" DROP NOT NULL,
ALTER COLUMN "delivery_started_at" DROP NOT NULL,
ALTER COLUMN "recepted_order_at" DROP NOT NULL;
