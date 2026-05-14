/*
  Warnings:

  - You are about to drop the column `day` on the `Availability` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,dayOfWeek,shiftType]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayOfWeek` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Availability_userId_day_shiftType_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "day",
ADD COLUMN     "dayOfWeek" "DayOfWeek" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Availability_userId_dayOfWeek_shiftType_key" ON "Availability"("userId", "dayOfWeek", "shiftType");
