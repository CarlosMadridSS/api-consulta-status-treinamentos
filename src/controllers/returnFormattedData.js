function returnFormattedData(dateString) 
{
    const moment = require('moment-timezone');

    const timestamp = dateString;
    
    const momentDate = moment(timestamp);
    
    const formattedDate = `${momentDate.format('DD')}/${momentDate.format('MM')}/${momentDate.format('YYYY')}`;
    
    return formattedDate
    
}


module.exports = returnFormattedData