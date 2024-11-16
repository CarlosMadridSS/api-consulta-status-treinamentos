const returnFormattedData = require('../../controllers/returnFormattedData')
const authorize = require('../../middlewares/authenticateToken')
const Colaborador = require('../../models/database/colaborador')
const Status = require('../../models/database/status')
const Treinamento = require('../../models/database/treinamento')
const TreinamentosColaborador = require('../../models/database/treinamentoColaborador')
const exportRoute = require('express').Router()
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path')
const fs = require('fs')
const csv = require('csv-parser');


const exportDatas = async () => {

    const dataColaborator = await Colaborador.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
    const dataStatus = await Status.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
    const dataTreinamento = await Treinamento.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })


    let dataTreinamentosColaborador = []
    let dataFilteredTreinamentoColaborador = []
    let dataFilteredTreinamento = []
    let dataFilteredColaborador = []
    let dataFilteredStatus = []
    let ok = false

    if (dataColaborator.length != 0 && dataStatus.length != 0 && dataTreinamento.length != 0) {

        dataTreinamentosColaborador = await TreinamentosColaborador.findAll({
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: Colaborador,
                    required: true,
                    attributes: ['id', 'matricula']
                },
                {
                    model: Treinamento,
                    required: true,
                    attributes: ['id', 'treinamento']
                },
                {
                    model: Status,
                    required: true,
                    attributes: ['id', 'status']

                }
            ]

        })


        dataFilteredColaborador = dataColaborator.map(item => item.dataValues)
        dataFilteredTreinamento = dataTreinamento.map(item => item.dataValues)
        dataFilteredStatus = dataStatus.map(item => item.dataValues)


        if (dataTreinamentosColaborador.length > 0) {

            dataFilteredTreinamentoColaborador = dataTreinamentosColaborador.map(item => {
                return {
                    matricula: item.colaborador == item.Colaborador.dataValues.id ? item.Colaborador.dataValues.matricula : null,
                    treinamento: item.treinamento == item.Treinamento.dataValues.id ? item.Treinamento.dataValues.treinamento : null,
                    status: item.status == item.Status.dataValues.id ? item.Status.dataValues.status : null,
                    inicio: returnFormattedData(item.inicio),
                    termino: returnFormattedData(item.termino)
                }
            }).filter(item => item.matricula !== null && item.treinamento !== null && item.status !== null)

            ok = true

        }

    }




    if (ok) {

        const csvWriterColaborador = createCsvWriter({
            path: 'src/public/exports/colaborador.csv',
            header: [
                { id: 'nome', title: 'Nome' },
                { id: 'matricula', title: 'matricula' },
            ],
        });

        const csvWriterTreinamento = createCsvWriter({
            path: 'src/public/exports/treinamento.csv',
            header: [
                { id: 'treinamento', title: 'treinamentos obrigatórios' },
            ],
        });

        const csvWriterStatus = createCsvWriter({
            path: 'src/public/exports/status.csv',
            header: [
                { id: 'status', title: 'status' },
            ],
        });

        const csvWriterTreinamentoColaborador = createCsvWriter({
            path: 'src/public/exports/treinamentos_colaborador.csv',
            header: [
                { id: 'matricula', title: 'matricula' },
                { id: 'treinamento', title: 'treinamento' },
                { id: 'status', title: 'status' },
                { id: 'inicio', title: 'inicio' },
                { id: 'termino', title: 'termino' }
            ],
        });

        await csvWriterColaborador.writeRecords(dataFilteredColaborador);
        await csvWriterTreinamento.writeRecords(dataFilteredTreinamento);
        await csvWriterStatus.writeRecords(dataFilteredStatus);
        await csvWriterTreinamentoColaborador.writeRecords(dataFilteredTreinamentoColaborador)


    }
}


const downloadFile = async (filename, res) => {
    const dataColaborator = await Colaborador.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
    const dataStatus = await Status.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
    const dataTreinamento = await Treinamento.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
    let dataTreinamentosColaborador = []

    dataTreinamentosColaborador = await TreinamentosColaborador.findAll({
        attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Colaborador,
                required: true,
                attributes: ['id', 'matricula']
            },
            {
                model: Treinamento,
                required: true,
                attributes: ['id', 'treinamento']
            },
            {
                model: Status,
                required: true,
                attributes: ['id', 'status']

            }
        ]

    })

    if (
        dataColaborator.length > 0 &&
        dataStatus.length > 0 &&
        dataTreinamento.length > 0 &&
        dataTreinamentosColaborador.length > 0
    ) {

        const file = path.join(__dirname, '../../../src', 'public', 'exports', `${filename}.csv`);

        let results = []

        if (!fs.existsSync(file)) { throw new Error(`Problemas ao exportar arquivos. Arquivos de exportação não encontrados`) }

        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                if (results && results.length > 0) {

                    fs.access(file, fs.constants.F_OK, (err) => {
                        if (err) throw new Error('Arquivo não encontrado.')

                        res.download(file, async (file) => {if (file)  await exportDatas()}, (err) => {
                            if (err) throw new Error('Erro ao enviar o arquivo.')

                            fs.unlink(file, (unlinkErr) => {
                                if (unlinkErr) throw new Error('Erro ao deletar arquivo')
                            });
                        });

                    });

                } else throw new Error('Erro ao deletar arquivo')

            })
            .on('error', (err) => { throw new Error('Erro ao ler o arquivo') });
    } else throw new Error('Parece que nem todas as tabelas contém dados.')
}


// Export Datas
exportRoute.get('/admin/export-datas', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {

    await exportDatas()
    res.render('layouts/export-spreadsheets-model', { title: 'Admin | Exportar Modelos' })

})


exportRoute.get('/admin/export-datas/download/:filename', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    try {

        const filename = String(req.params.filename);

        await downloadFile(filename, res)

    } catch (error) {
        console.error(error.message);
        req.flash('error_msg', error.message)
        return res.redirect('/admin/export-datas')
    }

})



module.exports = exportRoute