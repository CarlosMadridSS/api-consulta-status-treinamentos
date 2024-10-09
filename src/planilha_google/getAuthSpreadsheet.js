const {google} = require('googleapis')

async function getAuthSpreadSheet () {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'src/planilha_google/credentials.json',
        scopes: process.env.SPREADSHEET_SCOPE
    })
    
    
    const client = await auth.getClient();
    
    
    const googleSheets = google.sheets({
        version: 'v4',
        auth: client
    
    })

    const spreadsheetId = process.env.SHEET_ID

    return{
        auth,
        client,
        googleSheets,
        spreadsheetId
    }
}


module.exports = getAuthSpreadSheet;