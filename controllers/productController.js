import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../models/productModel.js';

import { getAllCategories } from '../models/categoryModel.js';

export async function getProducts(req, res) {
    try {
        const products = await getAllProducts();
        const categories = await getAllCategories();
        res.render('products/index', { products, categories });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al obtener los productos');
    }
}

export async function getProduct(req, res) {
    const { id } = req.params;

    const esNumero = Number(id);

    if (!Number.isInteger(esNumero) || esNumero <= 0) {
        return res.status(400).send('El ID debe ser un entero positivo');
    }

    try {
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        const categories = await getAllCategories(); // <-- Traer las categorías
        res.render('products/edit', { product, categories });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno de servidor');
    }
}

export async function addProduct(req, res) {
    const { name, description, price, stock, category_id } = req.body;

    const stockNumber = Number(stock);
    const catidNumber = Number(category_id);
    const priceNumber = Number(price);

    if (!name || name.trim() === '') {
        return res.status(400).send('El nombre es obligatorio');
    }

    if (!description || description.trim() === '') {
        return res.status(400).send('La descripcion es obligatorio');
    }

    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        return res.status(400).send('El precio debe ser un número mayor que 0');
    }

    if (!Number.isInteger(stockNumber) || stockNumber < 0) {
        return res
            .status(400)
            .send('El stock debe ser un entero mayor o igual a 0');
    }

    if (!Number.isInteger(catidNumber) || catidNumber < 1) {
        return res
            .status(400)
            .send('El id de categoria debe ser un entero a partir de 1');
    }
    try {
        const newProduct = await createProduct(
            name,
            description,
            priceNumber,
            stockNumber,
            catidNumber,
        );

        res.redirect('/products');
    } catch (error) {
        if (error.code === '23503') {
            console.error('Error:', error);
            return res.status(404).send('La categoría no existe');
        }
        console.error('Error:', error);
        return res.status(500).send('Error interno del servidor');
    }
}

export async function actualizeProduct(req, res) {
    const { id } = req.params;

    const { name, description, price, stock, category_id } = req.body;

    const idNumber = Number(id);
    const stockNumber = Number(stock);
    const catidNumber = Number(category_id);
    const priceNumber = Number(price);

    if (!Number.isInteger(idNumber) || idNumber < 1) {
        return res.status(400).send('El id debe ser un numero a partir de 1');
    }
    if (!name || name.trim() === '') {
        return res.status(400).send('El nombre es obligatorio');
    }

    if (!description || description.trim() === '') {
        return res.status(400).send('La descripcion es obligatorio');
    }

    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        return res.status(400).send('El precio debe ser un número mayor que 0');
    }

    if (!Number.isInteger(stockNumber) || stockNumber < 0) {
        return res
            .status(400)
            .send('El stock debe ser un entero mayor o igual a 0');
    }

    if (!Number.isInteger(catidNumber) || catidNumber < 1) {
        return res
            .status(400)
            .send('El id de categoria debe ser un entero a partir de 1');
    }

    try {
        const cambioProduct = await updateProduct(
            idNumber,
            name,
            description,
            priceNumber,
            stockNumber,
            catidNumber,
        );

        if (!cambioProduct) {
            return res.status(404).send('No se encontro el producto');
        }

        res.redirect('/products');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export async function removeProduct(req, res) {
    const { id } = req.params;

    const esNumero = Number(id);

    if (!Number.isInteger(esNumero) || esNumero <= 0) {
        return res.status(400).send('El ID debe ser un entero positivo');
    }

    try {
        const eliminarProduct = await deleteProduct(id);

        if (!eliminarProduct) {
            return res
                .status(404)
                .send('No se encontro el producto a eliminar');
        }

        res.redirect('/products');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
}
