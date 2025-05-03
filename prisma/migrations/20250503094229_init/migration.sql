-- AlterTable
ALTER TABLE "blackListedToken" ADD CONSTRAINT "blackListedToken_pkey" PRIMARY KEY ("token");

-- DropIndex
DROP INDEX "blackListedToken_token_key";
