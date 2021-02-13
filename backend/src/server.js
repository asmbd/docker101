require('dotenv').config();
const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-cors'));

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, TOKEN_SECRET } = process.env;

fastify.register(require('fastify-mysql'), {
	connectionString: `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:3306/kuclap`,
	promise: true,
});

fastify.register(require('./reviews-routes'));

fastify.get('/', async () => {
	return { server: process.env.NODE_ENV }
})

// Run the server!
const start = async () => {
	try {
		await fastify.listen(process.env.PORT, "0.0.0.0")
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()