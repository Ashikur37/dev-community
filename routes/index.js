const publicRoutes = require('./publicRoutes');
const userRoutes = require('./userRoutes');
module.exports.setRoutes = app => {
	publicRoutes.setRoutes(app);
	userRoutes.setRoutes(app);
};
