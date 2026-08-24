import {
    getAllProducts,
    getProductById,
    createProduct,
} from '../models/productModel.js';

export async function getProducts(req, res) {
    const products = await getAllProducts();

    //res.render('products/index', products);
    res.json(products);
}

export async function getProduct(req, res) {
    const { id } = req.params;

    const product = await getProductById(id);

    if (!product) {
        return res.status(404).render('404');
    }

    /*res.render('products/show', {
        product,
    });*/

    res.json(product);
}

export async function addProduct(req, res) {
    const { name, description, price, stock, category_id } = req.body;

    const newProduct = await createProduct(
        name,
        description,
        price,
        stock,
        category_id,
    );

    res.status(201).json(newProduct);
}

export async function deleteProduct(req, res) {}
