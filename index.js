import express from 'express';
import rutascategoria from './routes/categoryRouter.js';
import rutasproducto from './routes/productsRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/categories', rutascategoria);
app.use('/products', rutasproducto);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
