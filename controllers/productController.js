import { getAllProducts, getProductById } from '../models/productModel.js';

export async function getProducts(req, res) {
    const products = await getAllProducts();

    res.render('products/index', products);
}

export async function getProduct(req, res) {
    const { id } = req.params;

    const product = await getProductById(id);

    if (!product) {
        return res.status(404).render('404');
    }

    res.render('products/show', {
        product,
    });
}
