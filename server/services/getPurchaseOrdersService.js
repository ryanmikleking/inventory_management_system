import { pool } from "../config/db.js";
import { AppError } from "../middleware/errors/AppError.js";

// export const getPurchaseOrdersService = async () => {
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN");
//     const limit = 20;
//     const offset = 0;
//     let query = `
//       SELECT
//         po.po_id,
//         po.company_id,
//         po.purchase_order_number,
//         po.notes,
//         po.quality_check,
//         po.created_at,
//         c.name AS company_name
//       FROM purchase_orders po
//       JOIN companies c ON c.company_id = po.company_id
//     `;

//     const params = [];
//     let whereAdded = false;

//     query += ` ORDER BY po.created_at DESC`;

//     params.push(limit);
//     query += ` LIMIT $${params.length}`;

//     params.push(offset);
//     query += ` OFFSET $${params.length}`;

//     const result = await pool.query(query, params);

//     return {
//       success: true,
//       count: result.rows.length,
//       purchase_orders: result.rows,
//     };
//   } catch (err) {
//     await client.query("ROLLBACK");
//     throw err;
//   } finally {
//     client.release();
//   }
// };
export const getPurchaseOrdersService = async ({
  page = 1,
  limit = 20,
  search = "",
  sort = "po.created_at",
  order = "DESC",
  company = "",
  qualityCheck,
}) => {
  const offset = (page - 1) * limit;

  try {
    let query = `
      SELECT
        po.po_id,
        po.company_id,
        po.purchase_order_number,
        po.notes,
        po.quality_check,
        po.created_at,
        c.name AS company_name
      FROM purchase_orders po
      JOIN companies c
        ON c.company_id = po.company_id
    `;

    const conditions = [];
    const params = [];
    if (search) {
      params.push(`%${search}%`);

      conditions.push(`
        (
          po.purchase_order_number ILIKE $${params.length}
          OR c.name ILIKE $${params.length}
          OR po.notes ILIKE $${params.length}
        )
      `);
    }

    if (company) {
      params.push(`%${company}%`);

      conditions.push(`
        c.name ILIKE $${params.length}
      `);
    }

    if (typeof qualityCheck === "boolean") {
      params.push(qualityCheck);

      conditions.push(`
        po.quality_check = $${params.length}
      `);
    }

    if (conditions.length > 0) {
      query += `
        WHERE ${conditions.join(" AND ")}
      `;
    }
    query += `
      ORDER BY ${sort} ${order}
    `;
    params.push(limit);
    query += ` LIMIT $${params.length}`;

    params.push(offset);
    query += ` OFFSET $${params.length}`;
    const result = await pool.query(query, params);
    let countQuery = `
      SELECT COUNT(*) AS total
      FROM purchase_orders po
      JOIN companies c
        ON c.company_id = po.company_id
    `;

    if (conditions.length > 0) {
      countQuery += `
        WHERE ${conditions.join(" AND ")}
      `;
    }

    const countParams = params.slice(0, -2);

    const countResult = await pool.query(countQuery, countParams);

    const totalItems = Number(countResult.rows[0].total);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: result.rows,

      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (err) {
    throw err;
  }
};
