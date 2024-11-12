const returnUrl = (req) => {
    const fullUrl = req.protocol + '://' + req.get('host')
    return fullUrl;
}


module.exports = returnUrl