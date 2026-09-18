import { pool } from "../../config/db.js";

export const getProductNumbers = async () => {
  const result = await pool.query(`
        SELECT
            *
        FROM products    
        `);
  return result.rows;
};
