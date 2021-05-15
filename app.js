const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const app = express();

mongoose.connect('mongodb://localhost/blog', { 
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true,
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
	res.send('This is the home page.');
});

app.use('/articles', articleRouter);

app.listen(5000);