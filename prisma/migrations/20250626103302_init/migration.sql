-- CreateTable
CREATE TABLE "digimon" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "rank" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "levelUPExp" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "attack" TEXT NOT NULL,
    "defense" TEXT NOT NULL,

    CONSTRAINT "digimon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "digimon_name_key" ON "digimon"("name");
