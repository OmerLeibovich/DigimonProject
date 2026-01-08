-- DropForeignKey
ALTER TABLE "digimon" DROP CONSTRAINT "digimon_userid_fkey";

-- AddForeignKey
ALTER TABLE "digimon" ADD CONSTRAINT "digimon_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
