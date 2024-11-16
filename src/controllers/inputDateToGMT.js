function inputDateToGMT(dateString) {
    const moment = require('moment-timezone');

    const gmtDate = moment.tz(dateString, 'GMT');

    return gmtDate.format('YYYY-MM-DD HH:mm:ss');
}

module.exports = inputDateToGMT