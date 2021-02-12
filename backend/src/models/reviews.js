const MySQLModel = require('./mysql-model');

class ReviewsTable extends MySQLModel {
    constructor(db, fastify) {
        super(db, 'reviews');
        this.fastify = fastify;
    }

    async addReview(reviewInfo) {
        const result = await this.create(reviewInfo);
        return result;
    }

    async getReviews() {
        const reviews = await this.find();
        return reviews
    }

    async updateReview(reviewID, updateInfo) {
        const filter = {
            id: reviewID
        };

        try {
            const result = await this.update(filter, updateInfo);
            if (result[0].affectedRows === 0) {
                return { message: "Review not found", status: 400 }
            } else {
                return { message: "Review info updated", status: 200 }
            }
        } catch (error) {
            return (error)
        }
    }

    async deleteReview(reviewID) {
        const filter = {
            id: reviewID
        }
        try {
            const result = await this.delete(filter)
            if (result[0].affectedRows === 0) {
                return { message: "Review not found", status: 400 }
            } else {
                return { message: "Review deleted", status: 200 }
            }
        } catch (error) {
            return (error)
        }
    }
}

module.exports = ReviewsTable;