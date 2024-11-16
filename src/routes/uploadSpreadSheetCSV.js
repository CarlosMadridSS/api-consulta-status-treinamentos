const csv = require('csv-parser');
const { Readable } = require('stream');
const insertStatus = require('../controllers/insert/insertStatus');
const insertTreinamentoColaborador = require('../controllers/insert/insertTreinamentoColaborador');
const insertColaborador = require('../controllers/insert/insertColaborador');
const insertTreinamento = require('../controllers/insert/insertTreinamento');
//const doHaveItemsInTables = require('../controllers/doHaveItemsInTables');

// Rota para receber os arquivos CSV

async function csvUploadAndConvert (req, res) {
    const results = {};

    // Verifica se todos os arquivos foram enviados
    if (!req.files || Object.keys(req.files).length < 4) {
        return res.render(
            'layouts/oops', { title: 'Processamento de Planilhas | Erro', 
            internalTemplate: '/admin/insert-spreadsheet',
            msg: {error: 'É necessário enviar quatro arquivos CSV.'}
        });
    }

    const filePromises = Object.keys(req.files).map((fileKey) => {
        return new Promise((resolve, reject) => {
            const fileData = [];
            const readableStream = Readable.from(req.files[fileKey][0].buffer); // Usando Readable.from()

            readableStream
                .pipe(csv())
                .on('data', (data) => fileData.push(data))
                .on('end', () => {
                    results[fileKey] = fileData; // Armazenar os dados de cada arquivo
                    resolve();
                })
                .on('error', (error) => {
                    reject(`Erro ao processar o arquivo ${fileKey}: ${error.message}`);
                });
        });
    });

    // Espera todos os arquivos serem processados
    await Promise.all(filePromises)
        .then(async () => {
            
            
            const dataInsertColaborador = await insertColaborador(results, req, res)
            const dataInsertStatus =  await insertStatus(results, req, res)
            const dataInsertTreinamento = await insertTreinamento(results, req, res)

            if(
                dataInsertColaborador &&
                dataInsertStatus &&
                dataInsertTreinamento
            ){
                //const resultCheckTables =  await doHaveItemsInTables()

                const dataInsertTreinamentoColaborador = await insertTreinamentoColaborador(results, req, res)

                if(dataInsertTreinamentoColaborador){
                    res.render('layouts/wait-process-csv', { title: 'Aguarde | Carregando Planilhas', action: '/admin/manage-spreadsheet'});
                }else{
                    throw new Error('Parece que as planilhas não foram carregadas adequadamente. Tente novamente mais tarde.')
                }

                //-----------------
            }else{
                throw new Error('É necessário que o conjunto de tabelas enteja com sua estrutura intacta para garantir o bom funcionamento.')
            }

        })
        .catch((error) => {
            console.log('Erro na importação:', error.message);

            res.render(
                'layouts/oops', { title: 'Processamento de Planilhas | Erro',
                internalTemplate: '/admin/insert-spreadsheet',
                msg: {error: error.message}
            });
        });
        
}



module.exports = csvUploadAndConvert;
