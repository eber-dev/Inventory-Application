import { Router } from 'express';
import {
    getCategories,
    getCategory,
    addCategory,
    actualizeCategory,
} from '../controllers/categoryController.js';

const rutascategoria = Router();

rutascategoria.get('/', getCategories);

rutascategoria.get('/:id', getCategory);

rutascategoria.post('/', addCategory);

rutascategoria.put('/:id', actualizeCategory);

export default rutascategoria;
