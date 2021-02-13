import axios from 'axios'

const getReviews = async (next) => {
    try {
        const response = await axios.get("http://localhost:3000/reviews")
        next(response.data)
    } catch (error) {
        console.log(error)
    }
}

const createReview = async (reviewData) => {
    try {
        const response = await axios.post("http://localhost:3000/reviews/create", reviewData)
        return response.status
    } catch (error) {
        console.log(error)
    }
}

const deleteReview = async (reviewID) => {
    try {
        const response = await axios.delete(`http://localhost:3000/reviews/${reviewID}`)
        return response.status
    } catch (error) {
        console.log(error)
    }
}

export {
    getReviews,
    createReview,
    deleteReview
}