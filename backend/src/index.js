const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
//const grapqlServer = require("./server");

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();
//Middleware to handle cookies (JWT)
server.express.use(cookieParser());
//decode the jwt token to get the user Id
server.express.use((req, res, next) => {
	const { token } = req.cookies;
	if (token) { 
		const {userId} = jwt.verify(token, process.env.APP_SECRET);
		//put the userId onto the req for future requests to access
		req.userId = userId;
	}
	//next pass along the request
	next();
});

server.start(
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL
		}
	},
	(deets) => {
		console.log(`Server is now running on port http:/localhost:${deets.port}`);
	}
);

