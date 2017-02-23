const express = require('express');

// We create our own server named app
// Express server handling requests and responses
const app            = express();
const expressLayouts = require('express-ejs-layouts');
const engine         = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const morgan         = require('morgan');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(myFakeMiddleware);
app.use(morgan('dev'));
app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// our first Route
app.get('/', (req, res, next) => {
  let data = {
      name: "Ironhacker",
      age: 5,
      country: "US",
      citiesTraveled: ["Miami", "Madrid", "Barcelona"],
      users: ["Bob", "Mary", "Ted"]
    };
  // send views/index.ejs for displaying in the browser
  res.render('index', data);
});

app.get('/test', (req, res) => {
  res.send("We made it to test!");
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  // What ES6 feature could we use to clean these two lines up?
  let email    = req.body.email;
  let password = req.body.password;

  let msg;
  if (email === "ironhacker@gmail.com" && password === "password"){
    msg = "Welcome!";
  } else {
    msg = "Go Away, you stink";
  }

  res.send(msg);

});

app.get('/get-user-info', (req, res) => {
  res.render('user-info-form');
});

app.get('/display-user-info', (req, res) => {
  let name      = req.query.name;
  let age       = req.query.age;
  let superhero = req.query.superhero;

  res.send(`
    Your name is ${name}
    Your age is ${age}
    Your favorite superhero is ${superhero}
  `);
});

// my second Route
app.get('/about', (req, res, next) => {
  // send views/index.ejs for displaying in the browser
  res.render('about');
});

app.get('/foods', (req, res, next) => {
  let data = {
    foods : ['Mac & Cheese', 'Sashimi', 'Pizza', 'Potato Salad', 'Pad Thai']
  };

  res.render('foods', data);
});

app.get('/hello', (req, res, next) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="stylesheets/style.css">
      </head>
      <body>
        This is my second route
      </body>
    </html>
  `);
});


function myFakeMiddleware(){
  console.log("myFakeMiddleware was called!");
  req.secretValue = "swordfish";
  next();
}

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
