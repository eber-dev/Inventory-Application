import { Router } from 'express';
import {
    getProducts,
    getProduct,
    addProduct,
    actualizeProduct,
    removeProduct,
} from '../controllers/productController.js';

const rutasproducto = Router();

rutasproducto.get('/', getProducts);

rutasproducto.get('/:id', getProduct);

rutasproducto.post('/', addProduct);

rutasproducto.put('/:id', actualizeProduct);

rutasproducto.delete('/:id', removeProduct);

export default rutasproducto;
