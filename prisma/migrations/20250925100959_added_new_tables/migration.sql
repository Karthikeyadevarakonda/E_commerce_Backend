-- CreateEnum
CREATE TYPE "public"."ProductType" AS ENUM ('SHIRT', 'PANT', 'TSHIRT', 'DRESS', 'SKIRT', 'JEANS', 'JACKET', 'SWEATER', 'HOODIE', 'SHORTS', 'SUIT', 'INNERWEAR', 'ACTIVEWEAR', 'SWIMWEAR', 'FOOTWEAR');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MEN', 'WOMEN', 'UNISEX', 'KIDS');

-- CreateEnum
CREATE TYPE "public"."Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productType" "public"."ProductType" NOT NULL,
    "image" TEXT NOT NULL,
    "gender" "public"."Gender"[],
    "rating" DOUBLE PRECISION,
    "viewCount" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "sizes" "public"."Size"[],
    "labels" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
