module.exports.setRoutes = app => {
	const userController = require('../controllers/userController');
	app.post('/user/register', userController.createUser);
	app.post('/user/login', userController.login);
};
