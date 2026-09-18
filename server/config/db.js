import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production" ? ".env.docker" : ".env.development",
});
import pg from "pg";

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  max: 10, // connection pool size
  idleTimeoutMillis: 30000,
});
