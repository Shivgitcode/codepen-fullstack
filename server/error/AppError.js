class AppError extends Error {
    constructor(status, message) {
        this.message = message
        this.status = status
    }

}

module.exports = { AppError }