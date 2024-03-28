const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function initDB() {
    await prisma.$queryRaw`CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL)
    WITH (OIDS=FALSE);`
    await prisma.$queryRaw`ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;`
    
    await prisma.$queryRaw`CREATE INDEX "IDX_session_expire" ON "session" ("expire");`
}

initDB();


module.exports = initDB;