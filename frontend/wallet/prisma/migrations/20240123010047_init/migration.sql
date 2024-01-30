-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "icon" TEXT,
    "description" TEXT,
    "tags" JSONB,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
