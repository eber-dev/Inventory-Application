import { Router } from 'express';
import {
    getCategories,
    getCategory,
    addCategory,
    actualizeCategory,
    removeCategory,
} from '../controllers/categoryController.js';

import { validateId } from '../middleware/validateID.js';

const rutascategoria = Router();

rutascategoria.get('/', getCategories);

rutascategoria.get('/:id', validateId, getCategory);

rutascategoria.post('/', addCategory);

rutascategoria.put('/:id', validateId, actualizeCategory);

rutascategoria.delete('/:id', validateId, removeCategory);

export default rutascategoria;
