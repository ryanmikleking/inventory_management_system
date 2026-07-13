import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: "host.docker.internal",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  max: 10, // connection pool size
  idleTimeoutMillis: 30000,
});
