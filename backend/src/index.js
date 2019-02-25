const server = require("./server");

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
