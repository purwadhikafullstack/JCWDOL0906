exports.successResponse = (message, data, count) => {
    return {
        success: true,
        message: message,
        data,
        count,

    }
}

exports.failedResponse = (message) => {
    return {
        success: false,
        message: message,
        data: {}
    }
}