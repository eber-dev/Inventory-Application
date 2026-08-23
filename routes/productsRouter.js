import { Router } from 'express';
import { getProducts, getProduct } from '../controllers/productController.js';

const rutasproducto = Router();

rutasproducto.get('/', getProducts);

rutasproducto.get('/:id', getProduct);

export default rutasproducto;
