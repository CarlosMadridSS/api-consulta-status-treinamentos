const getAuthSpreadsheet = require('../planilha_google/getAuthSpreadsheet');

const getValuesApi = async (range) => {
    

    const {googleSheets, auth, spreadsheetId} = await getAuthSpreadsheet()
    
    const values = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: range
    })

    return await values;
}


module.exports = getValuesApi