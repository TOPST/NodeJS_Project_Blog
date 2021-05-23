// Import packages.
const mongoose = require('mongoose');
const slugify = require('slugify');

// Define the model properties.
const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	}
});

// Functions.
userSchema.pre('validate', function(next){
	if(this.first_name) {
		this.slug = slugify(this.first_name, { lower: true, strict: true }) + '-' + this.id.substring(this.id.length - 3);
	}
	next();
});

// Export model.
module.exports = mongoose.model('User', userSchema)