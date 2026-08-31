import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../models/categoryModel.js';

import { validateId } from '../middleware/validateID.js';

export async function getCategories(req, res) {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener las categorías',
        });
    }

    //res.render('categories/index', { categories });
}

export async function getCategory(req, res) {
    const { id } = req.params;

    try {
        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                error: 'Categoria no encontrado',
            });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
        });
    }

    //res.render('categories/show', { category });
}

export async function addCategory(req, res) {
    const { name, description } = req.body;

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

    try {
        const newCategory = await createCategory(name, description);

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
        });
    }
}

export async function actualizeCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

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

    try {
        const cambioCategory = await updateCategory(id, name, description);

        if (!cambioCategory) {
            return res.status(404).json({
                error: 'No se encontro la categoria a actualizar',
            });
        }

        res.status(200).json(cambioCategory);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
        });
    }
}

export async function removeCategory(req, res) {
    const { id } = req.params;

    try {
        const eliminarCategoria = await deleteCategory(id);

        if (!eliminarCategoria) {
            return res.status(404).json({
                error: 'No se encontro la categoria a eliminar',
            });
        }

        res.status(200).json(eliminarCategoria);
    } catch (error) {
        if (error.code === '23503') {
            return res.status(409).json({
                message:
                    'No se puede eliminar la categoría porque tiene productos asociados',
            });
        }

        res.status(500).json({
            message: 'Error al eliminar la categoría',
        });
    }
}
