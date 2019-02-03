const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
	async createVisitor(parent, args, ctx, info) {
		console.log('args', args);
		const visitor = await ctx.db.mutation.createVisitor(
			{
				data: {
					...args
				}
			},
			info
		);

		return visitor;
	},
	updateVisitor(parent, args, ctx, info) {
		// first take a copy of the updates
		const updates = { ...args };
		console.log('update', updates);
		// remove the ID from the updates
		delete updates.id;
		// run the update method
		return ctx.db.mutation.updateVisitor(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	},

	async signup(parent, args, ctx, info) {
		args.email = args.email.toLowerCase();
		// hash the user password
		const password = await bcrypt.hash(args.password, 10);
		// create user in the db
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: { set: [ 'USER' ] },
					status: { set: ['ACTIVE'] },
				},
			},
			info
		);
		// create the JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// we set the jwt as a cookie on the respond
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 0.5, // 1/2 hour session
		});
		return user;
	},

	async signin(parent, {email, password }, ctx, info) {
		// check if there is a user with password
		const user = await ctx.db.query.user({ where: { email }});
		if (!user) {
			throw new Error(`Usuario no valido par el correo ${email}`);
		}
		// check if the password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Contraseña Invalida!');
		}
		// generate the JWT token
		const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET);
		// set the cookie with the token
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 0.5, // 1/2 hour session
		});
		return user;	
	}
};

module.exports = mutations;
