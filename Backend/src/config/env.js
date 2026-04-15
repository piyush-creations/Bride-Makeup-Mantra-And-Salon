import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log(`DATABASE_URL loaded: ${process.env.DATABASE_URL ? 'YES' : 'NO'}`);