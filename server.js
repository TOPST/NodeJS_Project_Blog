// Import packages.
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

// Import routes.
const homeRouter = require('./routes/home');
const accountRouter = require('./routes/account');
const articleRouter = require('./routes/articles');

// Connection to MongoDB.
mongoose.connect(process.env.DATABASE_URL, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('MongoDB connected.'));

// Initialization.
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

// Use routes.
app.use('/', homeRouter);
app.use('/account', accountRouter);
app.use('/articles', articleRouter);

// "Render" the server.
app.listen(process.env.PORT);