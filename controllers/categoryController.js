import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
} from '../models/categoryModel.js';

export async function getCategories(req, res) {
    const categories = await getAllCategories();

    //res.render('categories/index', { categories });
    res.json(categories);
}

export async function getCategory(req, res) {
    const { id } = req.params;

    const category = await getCategoryById(id);

    if (!category) {
        return res.status(404).render('404');
    }

    //res.render('categories/show', { category });
    res.json(category);
}

export async function addCategory(req, res) {
    const { name, description } = req.body;

    const newCategory = await createCategory(name, description);

    res.status(201).json(newCategory);
}

export async function actualizeCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    const cambioCategory = await updateCategory(id, name, description);

    res.status(200).json(cambioCategory);
}

export async function deleteCategory(req, res) {}
