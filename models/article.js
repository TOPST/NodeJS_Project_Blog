const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);


const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	markdown: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	sanitizedHtml: {
		type: String,
		required: true,
	},
});

// strict : permet de se débarasser de tout type de caractère qui ne
// serait pas approprié dans un url.
articleSchema.pre('validate', function(next){
	if(this.title) {
		this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + this.id.substring(this.id.length - 3);
	}
	if(this.markdown) {
		this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
	}
	next();
});

module.exports = mongoose.model('Article', articleSchema)