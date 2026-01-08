-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_userId_fkey";

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
