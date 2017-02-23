const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const engine         = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const morgan         = require('morgan');

const app = express();
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('layout', 'layouts/use-everywhere');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// Routes
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/pics', (req, res) => {
  res.render('pics');
});

app.get('/celebrity-baby', (req, res, next) => {
  res.render('celebrity-baby')
});

app.listen(3000, () => {});
