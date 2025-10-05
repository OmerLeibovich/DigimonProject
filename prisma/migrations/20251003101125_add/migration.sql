-- CreateIndex
CREATE INDEX "inventory_userId_itemId_idx" ON "inventory"("userId", "itemId");

-- CreateIndex
CREATE INDEX "user_username_idx" ON "user"("username");

-- CreateIndex
CREATE INDEX "user_password_idx" ON "user"("password");

-- CreateIndex
CREATE INDEX "user_token_idx" ON "user"("token");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");
