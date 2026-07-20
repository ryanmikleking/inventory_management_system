import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.DB_HOST === "production" ? ".env.docker" : ".env.development",
});
import { ensureBucket } from "./services/minioService.js";

import app from "./app.js";
import { pool } from "./config/db.js";

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    console.log("✅ Correct Server Instance");
    // 🧠 test DB connection before starting server
    console.log({
      NODE_ENV: process.env.NODE_ENV,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
    });
    const result = await pool.query("SELECT NOW()");
    const minIOresult = await ensureBucket();
    console.log(
      "✅ PostgreSQL connected:",
      result.rows[0],
      "\n✅ MinIO Bucket :",
      minIOresult,
    );

    // start Express only if DB is OK
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  }
}

startServer();
