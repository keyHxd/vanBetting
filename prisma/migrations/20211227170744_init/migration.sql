-- CreateTable
CREATE TABLE "player" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0
);
