import { Router } from 'express';
import {
    getProducts,
    getProduct,
    addProduct,
} from '../controllers/productController.js';

const rutasproducto = Router();

rutasproducto.get('/', getProducts);

rutasproducto.get('/:id', getProduct);

rutasproducto.post('/', addProduct);

export default rutasproducto;
