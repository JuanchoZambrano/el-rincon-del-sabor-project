import { pool } from "../config/db.js";

export async function getAllSales() {
  const { rows } = await pool.query(
    `SELECT 
        sales.id AS sale_id,
        sales.sale_address,
        sales.phone_number,
        sales.sale_date,
        sales.sale_status,
        customers.customer_name AS customer_name 
     FROM sales 
     INNER JOIN customers ON sales.customer_id = customers.id 
     ORDER BY sales.id ASC`,
  );
  return rows;
}

export async function getSaleById(id: number) {
  const { rows } = await pool.query(
    `SELECT        
        sales.id AS sale_id,
        sales.sale_address,
        sales.phone_number,
        sales.sale_date,
        sales.sale_status,
        customers.customer_name AS customer_name                             
     FROM sales
     INNER JOIN customers ON sales.customer_id = customers.id
     WHERE sales.id = $1`,
    [id],
  );
  return rows[0];
}

export async function createSale(
  sale_address: string,
  phone_number: string,
  customer_id: number,
  sale_date: string,
  sale_status: boolean,
) {
  const { rows } = await pool.query(
    "INSERT INTO sales (sale_address, phone_number, customer_id, sale_date, sale_status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [sale_address, phone_number, customer_id, sale_date, sale_status],
  );

  return rows[0];
}
