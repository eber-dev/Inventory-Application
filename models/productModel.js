import pool from '../db/pool.js';

export async function getAllProducts() {
    const { rows } = await pool.query('SELECT * FROM products;');
    return rows;
}

export async function getProductById(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1;', [
        id,
    ]);
    return rows[0];
}

export async function getProductsByCategory(categoryId) {
    const { rows } = await pool.query(
        'SELECT * FROM products WHERE category_id = $1;',
        [categoryId],
    );
    return rows;
}

export async function createProduct(
    name,
    description,
    price,
    stock,
    category_id,
) {
    await pool.query(
        'INSERT INTO products (name, description, price,stock,category_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [name, description, price, stock, category_id],
    );
}

export async function updateProduct(
    id,
    name,
    description,
    price,
    stock,
    category_id,
) {
    const result = await pool.query(
        `UPDATE products
         SET name = $1,
             description = $2,
             price = $3,
             stock = $4,
             category_id = $5
         WHERE id = $6
         RETURNING *`,
        [name, description, price, stock, category_id, id],
    );

    return result.rows[0];
}
export async function deleteProduct(id) {
    const result = await pool.query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id],
    );

    return result.rows[0];
}
