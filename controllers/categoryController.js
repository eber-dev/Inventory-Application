import { getAllCategories, getCategoryById } from '../models/categoryModel.js';

export async function getCategories(req, res) {
    const categories = await getAllCategories();

    res.render('categories/index', { categories });
}

export async function getCategory(req, res) {
    const { id } = req.params;

    const category = await getCategoryById(id);

    res.render('categories/show', { category });

    if (!category) {
        return res.status(404).render('404');
    }
}
