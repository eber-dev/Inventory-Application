import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../models/categoryModel.js';

export async function getCategories(req, res) {
    try {
        const categories = await getAllCategories();
        res.render('categories/index', { categories });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al obtener las categorías');
    }
}

export async function getCategory(req, res) {
    const { id } = req.params;

    try {
        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).send('Categoria no encontrado');
        }
        res.render('categories/edit', { category });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno de servidor');
    }
}

export async function addCategory(req, res) {
    const { name, description } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).send('El nombre es obligatorio');
    }

    if (!description || description.trim() === '') {
        return res.status(400).send('La descripción es obligatoria');
    }

    try {
        const newCategory = await createCategory(name, description);
        res.redirect('/categories');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno de servidor');
    }
}

export async function actualizeCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).send('El nombre es obligatorio');
    }

    if (!description || description.trim() === '') {
        return res.status(400).send('La descripción es obligatoria');
    }

    try {
        const cambioCategory = await updateCategory(id, name, description);

        if (!cambioCategory) {
            return res
                .status(404)
                .send('No se encontro la categoria a actualizar');
        }

        res.redirect('/categories');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno de servidor');
    }
}

export async function removeCategory(req, res) {
    const { id } = req.params;

    try {
        const eliminarCategoria = await deleteCategory(id);

        if (!eliminarCategoria) {
            return res
                .status(404)
                .send('No se encontro la categoria a eliminar');
        }

        res.redirect('/categories');
    } catch (error) {
        if (error.code === '23503') {
            return res
                .status(409)
                .send(
                    'No se puede eliminar la categoría porque tiene productos asociados',
                );
        }

        console.error('Error:', error);
        res.status(500).send('Error al eliminar la categoria');
    }
}
