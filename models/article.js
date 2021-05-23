// Import packages.
const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

// Define the model properties.
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
	},
});

// Functions.
articleSchema.pre('validate', function(next){
	if(this.title) {
		this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + this.id.substring(this.id.length - 3);
	}
	if(this.markdown) {
		this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
	}
	next();
});

// Export model.
module.exports = mongoose.model('Article', articleSchema)