import { pool } from "../config/db.js";

export async function getAllCustomers() {
    const { rows } = await pool.query('SELECT * FROM customers ORDER BY id ASC');
    return rows;
}

export async function getCustomerById(id: number) { 
    const { rows } = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    return rows[0];
}

export async function createCustomer(name: string, email: string, phone_number: string) {
    const { rows } = await pool.query('INSERT INTO customers (customer_name, email, phone_number) VALUES ($1, $2, $3) RETURNING *', [name, email, phone_number]);
    return rows[0];
}

export async function updateCustomerById(id: number, name: string, email: string, phone_number: string) { 
    const { rows } = await pool.query('UPDATE customers SET customer_name = $2, email = $3, phone_number = $4 WHERE id = $1 RETURNING *', [id, name, email, phone_number]);
    return rows[0];
}