const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const rootRoutes = require('./routes');
const bodyParser = require('body-parser');

dbConnect.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
rootRoutes.setRoutes(app);
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('started');
});
