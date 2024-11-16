function commonDateToGMT(dataString) {

    const [day, month, year] = dataString.split('/');

    const data = new Date(Date.UTC(year, month - 1, day));

    return data.toUTCString()

}

module.exports = commonDateToGMT