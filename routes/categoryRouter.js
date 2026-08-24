import { Router } from 'express';
import {
    getCategories,
    getCategory,
    addCategory,
} from '../controllers/categoryController.js';

const rutascategoria = Router();

rutascategoria.get('/', getCategories);

rutascategoria.get('/:id', getCategory);

rutascategoria.post('/', addCategory);

export default rutascategoria;
