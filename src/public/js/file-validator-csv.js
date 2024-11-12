'use strict'


const  validateAndConvertCSVtoJSON = (inputSpreadsheet, event) => {
    const fileInput = event.target.files[0]


    if (fileInput) {
      const archiveTypeInput = fileInput.type
      
      if (archiveTypeInput !== 'text/csv' || archiveTypeInput !== 'application/csv') {
          btnSpreadSheets.disabled = true

          if (inputSpreadsheet.classList.contains('is-valid')) {
            inputSpreadsheet.classList.remove('is-valid')
          }

          inputSpreadsheet.classList.add('is-invalid')
      }
      
      if (archiveTypeInput === 'text/csv' || archiveTypeInput === 'application/csv'){
        btnSpreadSheets.disabled = false

        if (inputSpreadsheet.classList.contains('is-invalid')) {
          inputSpreadsheet.classList.remove('is-invalid')
        }

        inputSpreadsheet.classList.add('is-valid')

      }
    }
}


const btnSpreadSheets = document.getElementById('btn-spreadsheet')

const treinamentoColaboradorSpreadsheetInput = document.getElementById('treinamento-colaborador-spreadsheet-input')
const colaboradorSpreadsheetInput = document.getElementById('colaborador-spreadsheet-input')
const statusSpreadsheetInput = document.getElementById('status-spreadsheet-input')
const treinamentoSpreadsheetInput = document.getElementById('treinamento-spreadsheet-input')



treinamentoColaboradorSpreadsheetInput.addEventListener('change', (event) => {validateAndConvertCSVtoJSON(treinamentoColaboradorSpreadsheetInput,event)})
colaboradorSpreadsheetInput.addEventListener('change', (event) => {validateAndConvertCSVtoJSON(colaboradorSpreadsheetInput,event)})
statusSpreadsheetInput.addEventListener('change', (event) => {validateAndConvertCSVtoJSON(statusSpreadsheetInput,event)})
treinamentoSpreadsheetInput.addEventListener('change', (event) => {validateAndConvertCSVtoJSON(treinamentoSpreadsheetInput,event)})




