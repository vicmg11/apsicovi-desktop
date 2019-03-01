const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transporter, makeAnEmail } = require('../mail');

const mutations = {
	// async createUser(parent, args, ctx, info) {
	// 	if (!ctx.request.userId) {
	// 		throw new Error('Acción no permitida, introducir email y contraseña para proseguir.');
	// 	}
	// 	const user = await ctx.db.mutation.createUser(
	// 		{
	// 			data: {
	// 				...args,
	// 				status: { set: [ 'ACTIVE' ] }
	// 			}
	// 		},
	// 		info
	// 	);

	// 	return user;
	// },

	async createVisitor(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			throw new Error('Acción no permitida, introducir email y contraseña para proseguir.');
		}
		const visitor = await ctx.db.mutation.createVisitor(
			{
				data: {
					//Relacion entre Visitante y Usuario
					user: {
						connect: {
							id: ctx.request.userId
						}
					},
					...args,
					//visitorType: { set: [ args.visitorType.toUpperCase() ] },
					status: { set: [ 'ACTIVE' ] }
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

	async updateVisitorStatus(parent, args, ctx, info) {
    return ctx.db.mutation.updateVisitor(
      {
        data: {
          status: {
            set: args.status,
          },
        },
        where: {
          id: args.id,
        },
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
					status: { set: [ 'ACTIVE' ] }
				}
			},
			info
		);
		// create the JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// we set the jwt as a cookie on the respond
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 0.5 // 1/2 hour session
		});
		return user;
	},

	async signin(parent, { email, password }, ctx, info) {
		// check if there is a user with password
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error(`Usuario no valido para el correo ${email}`);
		}
		// check if the password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Contraseña Invalida!');
		}
		// generate the JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// set the cookie with the token
		ctx.response.cookie('token', token, {
			httpOnly: false,
			maxAge: 1000 * 60 * 60 * 0.5 // 1/2 hour session
		});
		return user;
	},

	signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return { message: 'Goodbye!' };
	},

	async requestReset(parent, args, ctx, info) {
		// check if real user
		const user = await ctx.db.query.user({ where: { email: args.email } });
		if (!user) {
			throw new Error(`Usuario no valido para el correo ${email}`);
		}
		// set a reset token and expiry on the user
		const randomBytesPromisify = promisify(randomBytes);
		const resetToken = (await randomBytesPromisify(20)).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000; //1 hour from now
		const res = await ctx.db.mutation.updateUser({
			where: { email: args.email },
			data: { resetToken, resetTokenExpiry }
		});

		// send mail with defined transport object
		const mailRes = await transporter.sendMail({
			from: 'victor@marmolejo.com',
			to: user.email,
			subject: 'Cambio de  Contraseña (APSICOVI)',
			html: makeAnEmail(`Para cambiar la contraseña dale click en el boton de abajo
			<a style="
			font-size: 20px;
			border-radius: 6px;
			color: white;
			background: #22568D;
			width: 240px;
			text-align: center;
			text-decoration: none;
			display: block;
			margin: 30px auto;
			font-weight: 600;
			" href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Cambia tu Contraseña</a>
			`)
		});

		return { message: 'Gracias!' };
		// email the user the reset password
	},

	async resetPassword(parent, args, ctx, info) {
		// check if the passwords match
		if (args.password !== args.confirmPassword) {
			throw new Error('Las contraseñas no son iguales!');
		}
		// check if is a legit reset token
		// check if its expired
		const [ user ] = await ctx.db.query.users({
			where: {
				resetToken: args.resetToken,
				resetTokenExpiry_gte: Date.now() - 3600000
			}
		});
		if (!user) {
			throw new Error('El token es invalido o esta expirado!');
		}
		// hash the new password
		const password = await bcrypt.hash(args.password, 10);
		// save the new password to the user and remove old resetToken
		const updateUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: {
				password,
				resetToken: null,
				resetTokenExpiry: null
			}
		});
		// generate Jwt
		const token = jwt.sign({ userId: updateUser.id }, process.env.APP_SECRET);
		// set the jwt cookie
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 0.5 // 1/2 hour session
		});
		// return the new user
		return updateUser;
	}
};

module.exports = mutations;
