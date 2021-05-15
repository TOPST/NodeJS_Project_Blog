const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const app = express();

//mongoose.connect('mongodb://localhost/blog', { 
//	useNewUrlParser: true, 
//	useUnifiedTopology: true,
//	useCreateIndex: true,
//})

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/blog', { 
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('MongoDB connected.'));

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

app.listen(process.env.PORT || 5000);