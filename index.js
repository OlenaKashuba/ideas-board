const SERVER_PORT = process.env.PORT || 7000;
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const pgp = require('pg-promise')();
const fetch = require('node-fetch');
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
app.use(bodyParser.urlencoded({extended: true}));

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'ideas-board'
});

app.get('/', (req,res) => {
	res.render('index');
});

app.get('/ideas-board', (req,res) => {
	res.render('board');
});



app.get('/api/ideas', (req,res) => {
	db.any('SELECT * FROM example_ideas ORDER BY id')
	.then((data) => {
		return res.json(data);
	})
	.catch((error) => {
		res.status(404).end();
	})
});

// app.post('/api/ideas', (req,res) => {
// 	db.any('INSERT INTO board(title,pic_url) SELECT title,pic_url FROM example_idea WHERE title = 'req.title' returning idea_id'

// })

app.post('/ideas-board', (req,res) => {
	getImages(req.body.idea)
	.then(function(image_url){
		const {idea} = req.body;
		return db.one('INSERT INTO board(title,pic_url) VALUES($1,$2) RETURNING idea_id', [idea, image_url]);
	})
  .then(data => {
    res.json(Object.assign({}, {id:data.idea_id}, req.body));
  })
  .catch(error => {
    res.status(404).json({
      error: error.message
    });
  });
    res.redirect('/');
});

function getImages(idea) {
	return fetch('https://api.unsplash.com//search/photos?client_id=6a6ede767bc379254117550b04b267f5cb3e64948f0ce78bddb852a5fd23b862&query=' + idea)
	.then(function(response) {
		return response.json();
	})
	.then(body => {
		return body.results[5].urls.small;
	})
	.catch(function(error) {
		return error;
	})
}

app.get('/api/ideas-board', (req,res) => {
	db.any('SELECT * FROM board') 
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
