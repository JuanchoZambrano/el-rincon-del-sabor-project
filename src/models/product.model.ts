import { pool } from "../config/db.js";

export async function getAllProducts(
  maxPrice?: number,
  page?: number,
  limit?: number,
) {
  let paramIndex = 1;

  let sqlText = `SELECT * FROM products`;
  const values: any[] = [];

  if (maxPrice !== undefined) {
    sqlText += ` WHERE price <= $${paramIndex}`;
    values.push(maxPrice);
    paramIndex++;
  }

  sqlText += ` ORDER BY id ASC`;

  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const offset = (pageNum - 1) * limitNum;

  sqlText += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  values.push(limitNum, offset);

  const { rows } = await pool.query(sqlText, values);
  return rows;
}

export async function getProductById(id: number) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

export async function createProduct(
  name: string,
  description: string,
  price: number,
  cost?: number,
  stock?: number,
) {
  const { rows } = await pool.query(
    "INSERT INTO products (product_name, product_description, price, cost, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, price, cost, stock],
  );
  return rows[0];
}

export async function updateProductById(
  id: number,
  name: string,
  description: string,
  price: number,
  cost?: number,
  stock?: number,
) {
  const { rows } = await pool.query(
    "UPDATE products SET product_name = $2, product_description = $3, price = $4, cost = $5, stock = $6 WHERE id = $1 RETURNING *",
    [id, name, description, price, cost, stock],
  );
  return rows[0];
}