import { Router } from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
} from '../controllers/productController.js';

const rutasproducto = Router();

rutasproducto.get('/', getProducts);

rutasproducto.get('/:id', getProduct);

rutasproducto.post('/', createProduct);

export default rutasproducto;
