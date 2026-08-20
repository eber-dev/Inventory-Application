import pool from './pool.js';

try {
    const resultado = await pool.query('SELECT NOW()');

    console.log('Conexión exitosa');
    console.log(resultado.rows);
} catch (error) {
    console.error('Error de conexión:');
    console.error(error.message);
} finally {
    await pool.end();
}
