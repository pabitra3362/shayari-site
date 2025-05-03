-- CreateTable
CREATE TABLE "blackListedToken" (
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "blackListedToken_token_key" ON "blackListedToken"("token");
