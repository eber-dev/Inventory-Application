import pool from '../db/pool.js';

export async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories;');
    return rows;
}

export async function getCategoryById(id) {
    const { rows } = await pool.query(
        'SELECT * FROM categories WHERE id = $1;',
        [id],
    );
    return rows[0];
}

export async function createCategory(name, description) {
    const result = await pool.query(
        'INSERT INTO categories(name, description) VALUES ($1, $2) RETURNING *',
        [name, description],
    );

    return result.rows[0];
}

export async function updateCategory(id, name, description) {
    const result = await pool.query(
        `UPDATE categories
         SET name = $1,
             description = $2
         WHERE id = $3
         RETURNING *`,
        [name, description, id],
    );

    return result.rows[0];
}

export async function deleteCategory(id) {
    const result = await pool.query(
        'DELETE FROM categories WHERE id = $1 RETURNING *',
        [id],
    );

    return result.rows[0];
}
