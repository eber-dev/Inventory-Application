import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../models/productModel.js';

export async function getProducts(req, res) {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los productos',
        });
    }

    //res.render('products/index', products);
}

export async function getProduct(req, res) {
    const { id } = req.params;

    const esNumero = Number(id);

    if (!Number.isInteger(esNumero) || esNumero <= 0) {
        return res.status(400).json({
            error: 'El ID debe ser un entero positivo',
        });
    }

    try {
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado',
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
        });
    }

    /*res.render('products/show', {
        product,
    });*/
}

export async function addProduct(req, res) {
    const { name, description, price, stock, category_id } = req.body;

    const stockNumber = Number(stock);
    const catidNumber = Number(category_id);
    const priceNumber = Number(price);

    if (!name || name.trim() === '') {
        return res.status(400).json({
            error: 'El nombre es obligatorio',
        });
    }

    if (!description || description.trim() === '') {
        return res.status(400).json({
            error: 'La descripcion es obligatorio',
        });
    }

    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        return res.status(400).json({
            error: 'El precio debe ser un número mayor que 0',
        });
    }

    if (!Number.isInteger(stockNumber) || stockNumber < 0) {
        return res.status(400).json({
            error: 'El stock debe ser un entero mayor o igual a 0',
        });
    }

    if (!Number.isInteger(catidNumber) || catidNumber < 1) {
        return res.status(400).json({
            error: 'El id de categoria debe ser un entero a partir de 1',
        });
    }
    try {
        const newProduct = await createProduct(
            name,
            description,
            price,
            stock,
            category_id,
        );

        res.status(201).json(newProduct);
    } catch (error) {
        if (error.code === '23503') {
            return res.status(404).json({
                error: 'La categoría no existe',
            });
        }

        return res.status(500).json({
            error: 'Error interno del servidor',
        });
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
        return res.status(400).json({
            error: 'El id debe ser un numero a partir de 1',
        });
    }
    if (!name || name.trim() === '') {
        return res.status(400).json({
            error: 'El nombre es obligatorio',
        });
    }

    if (!description || description.trim() === '') {
        return res.status(400).json({
            error: 'La descripcion es obligatorio',
        });
    }

    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        return res.status(400).json({
            error: 'El precio debe ser un número mayor que 0',
        });
    }

    if (!Number.isInteger(stockNumber) || stockNumber < 0) {
        return res.status(400).json({
            error: 'El stock debe ser un entero mayor o igual a 0',
        });
    }

    if (!Number.isInteger(catidNumber) || catidNumber < 1) {
        return res.status(400).json({
            error: 'El id de categoria debe ser un entero a partir de 1',
        });
    }

    try {
        const cambioProduct = await updateProduct(
            idNumber,
            name,
            description,
            priceNumber,
            stockNumber,
            category_id,
        );

        if (!cambioProduct) {
            return res.status(404).json({
                error: 'No se encontro el producto',
            });
        }

        res.status(200).json(cambioProduct);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
        });
    }
}

export async function removeProduct(req, res) {
    const { id } = req.params;

    const esNumero = Number(id);

    if (!Number.isInteger(esNumero) || esNumero <= 0) {
        return res.status(400).json({
            error: 'El ID debe ser un entero positivo',
        });
    }

    try {
        const eliminarProduct = await deleteProduct(id);

        if (!eliminarProduct) {
            return res.status(404).json({
                error: 'No se encontro el producto a eliminar',
            });
        }

        res.status(200).json(eliminarProduct);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
        });
    }
}
