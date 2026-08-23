import express from 'express';
import rutascategoria from './routes/categoryRouter.js';
import rutasproducto from './routes/productsRouter.js';

const app = express();

app.use('/categories', rutascategoria);
app.use('/products', rutasproducto);

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
