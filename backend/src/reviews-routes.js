const ReviewsTable = require('./models/reviews');

async function routes(fastify) {
    const { mysql } = fastify;
    const reviews = new ReviewsTable(mysql);

    fastify.post('/reviews/create', async (request, reply) => {
        const reviewInfo = request.body;
        const res = await reviews.addReview(reviewInfo);
        reply.code(res.status || 200).send(res);
    });

    fastify.get('/reviews', async (request, reply) => {
        const res = await reviews.getReviews()
        reply.code(res.status || 200).send(res)
    })

    fastify.delete('/reviews/:id', async (request, reply) => {
        const reviewID = request.params.id
        try {
            const res = await reviews.deleteReview(reviewID)
            reply.code(res.status || 200).send(res)
        } catch (error) {
            reply.send(error)
        }
    })
}

module.exports = routes;