import { Router } from 'express';
import {
    getCategories,
    getCategory,
} from '../controllers/categoryController.js';

const rutascategoria = Router();

rutascategoria.get('/', getCategories);

rutascategoria.get('/:id', getCategory);

export default rutascategoria;
