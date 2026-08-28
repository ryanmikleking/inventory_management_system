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
export const productDB = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_PRODUCT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10, // connection pool size
  idleTimeoutMillis: 30000,
});
