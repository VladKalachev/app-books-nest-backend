-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_genreId_fkey";

-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_publishingId_fkey";

-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "authorId" DROP NOT NULL,
ALTER COLUMN "genreId" DROP NOT NULL,
ALTER COLUMN "publishingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_publishingId_fkey" FOREIGN KEY ("publishingId") REFERENCES "Publishing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
