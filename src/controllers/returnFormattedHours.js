function returnFormattedHours(dateString) 
{
    const moment = require('moment-timezone');

    const timestamp = dateString;
    
    const momentDate = moment(timestamp);
    
    const formattedDate = `${momentDate.format('DD')}/${momentDate.format('MM')}/${momentDate.format('YYYY')} - ${momentDate.format('HH')}:${momentDate.format('mm')}`;
    
    return formattedDate
    
}


module.exports = returnFormattedHours