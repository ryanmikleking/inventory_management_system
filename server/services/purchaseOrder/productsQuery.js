import { pool } from "../../config/db.js";

export const getProductNumbers = async () => {
  const result = await pool.query(`
        SELECT
            incoming_product_no
        FROM products    
        `);
  return result.rows;
};
