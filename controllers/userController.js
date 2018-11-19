const user = require('../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
	user.findOne({ email: req.body.email }).then(User => {
		if (User) {
			return res.status(400).json({
				email: 'this email has been used',
			});
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});
			const newUser = new user({
				name: req.body.name,
				password: req.body.password,
				email: req.body.email,
				avatar: avatar,
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
					if (err) throw err;
					newUser.password = hashedPassword;
					newUser
						.save()
						.then(user => {
							res.json(user);
						})
						.catch(e => {
							console.log(e);
						});
				});
			});
		}
	});
};

exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	user.findOne({ email: email })
		.then(User => {
			if (!User) {
				return res.status(404).json({ email: 'user not found' });
			}
			bcrypt
				.compare(password, User.password)
				.then(isMatch => {
					if (isMatch) {
						res.json(User);
					} else {
						res.status(400).json({
							password: 'wrong password',
						});
					}
				})
				.catch(e => {});
		})
		.catch(e => {
			console.log(e);
		});
};
