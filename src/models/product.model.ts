import { pool } from '../config/db.js';

export async function getAllProducts() {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
}

export async function getProductById(id: number) { 
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
}

export async function createProduct(name: string, description: string, price: number) {
    const { rows } = await pool.query('INSERT INTO products (product_name, product_description, price) VALUES ($1, $2, $3) RETURNING *', [name, description, price]);
    return rows[0];
}

export async function updateProductById(id: number, name: string, description: string, price: number) { 
    const { rows } = await pool.query('UPDATE products SET product_name = $2, product_description = $3, price = $4 WHERE id = $1 RETURNING *', [id, name, description, price]);
    return rows[0];
}