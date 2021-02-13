import axios from 'axios'

const login = async (auth) => {
    try {
        const response = await axios.post("http://localhost:3000/login", auth)
        localStorage.setItem("access_token", response.data.access_token)
        return response.status
    } catch (error) {
        return error.response.status
    }
}

const logout = () => {
    localStorage.removeItem("access_token")
    window.location = "/"
}

const register = async (registerData) => {
    try {
        const response = await axios.post("http://localhost:3000/register", registerData)
        return response.status
    } catch (error) {
        return error.response.status
    }
}

const getReviews = async (next) => {
    try {
        const response = await axios.get("http://localhost:3000/reviews")
        next(response.data)
    } catch (error) {
        console.log(error)
    }
}

const joinParty = async (partyID) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        const response = await axios.get(`http://localhost:3000/party/join/${partyID}`, config)
        return response.data
    } catch (error) {
        if (error.response.status === 401) {
            logout()
        } else if (error.response.status === 400) {
            return (error.response)
        }
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

export {
    login,
    logout,
    register,
    getReviews,
    joinParty,
    createReview
}