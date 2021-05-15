const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/', async (req, res) => {
	const articles = await Article.find().sort({ createdAt: 'desc'});
	res.render('articles/home', { articles: articles, title: 'Home' });
});

router.get('/new', (req, res) => {
	res.render('articles/new_article', { article: new Article(), title: 'New article' });
});

router.get('/edit/:id', async (req, res) => {
	const article = await Article.findById(req.params.id);
	res.render('articles/edit_article', { article: article, title: 'Edit : ' + article.title });
});

router.get('/:slug', async (req, res) => {
	const article = await Article.findOne({ slug: req.params.slug });
	if (article == null) {res.redirect('/')};
	res.render('articles/show_article', { article: article, title: article.title });
});

router.post('/', async (req, res, next) => {
	req.article = new Article();
	next();
}, saveArticleAndRedirect('new_article'));
	
router.put('/:id', async (req, res, next) => {
	req.article = await Article.findById(req.params.id);
	next();
}, saveArticleAndRedirect('edit_article'));

router.delete('/:id', async (req, res) => {
	await Article.findByIdAndDelete(req.params.id);
	res.redirect('/articles');
});

function saveArticleAndRedirect(path){
	return async (req, res) => {
		let article = req.article;
		article.title = req.body.title;
		article.description = req.body.description;
		article.markdown = req.body.markdown;
		try {
			article = await article.save();
			res.redirect('/articles/' + article.slug);
		} catch (e) {
			res.render('articles/' + path, { article: article, title: 'New article - Please Retry' });
		}
	}
};

module.exports = router;
