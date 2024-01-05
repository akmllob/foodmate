const response = (statusCode, data, message, res) => {
    res.status(statusCode).json ({
        payload : {
            status_code : statusCode,
            datas : data,
            messages : message
        }
    })
}

module.exports = response
