import { Router } from 'express';
import {
    getCategories,
    getCategory,
    createCategory,
} from '../controllers/categoryController.js';

const rutascategoria = Router();

rutascategoria.get('/', getCategories);

rutascategoria.get('/:id', getCategory);

rutascategoria.post('/', createCategory);

export default rutascategoria;
