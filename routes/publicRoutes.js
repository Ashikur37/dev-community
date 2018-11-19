module.exports.setRoutes = app => {
	app.get('/', (req, res) => {
		res.send('its home');
	});
};
