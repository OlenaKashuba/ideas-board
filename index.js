const SERVER_PORT = process.env.PORT || 7000;
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const pgp = require('pg-promise')();
const app = express();

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs'
  })
);

app.set('view engine', 'hbs');
app.use(express.static('static'));
app.use(bodyParser.json());

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'ideas-board'
});

app.get('/', (req,res) => {
	res.render('index');
});

app.get('/api/ideas', (req,res) => {
	db.any('SELECT * FROM ideas')
	.then((data) => {
		return res.json(data);
	})
	.catch((error) => {
		res.status(404).end();
	})
});









app.listen(SERVER_PORT, () => {
	console.info(`Server started at http:localhost:${SERVER_PORT}`);
});
