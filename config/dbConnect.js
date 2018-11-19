const mongoose = require('mongoose');
const connectUrl = require('./dbConfig').url;
module.exports.connect = () => {
	mongoose
		.connect(connectUrl)
		.then(() => {
			console.log('connected');
		})
		.catch(e => {
			console.log(e);
		});
};
