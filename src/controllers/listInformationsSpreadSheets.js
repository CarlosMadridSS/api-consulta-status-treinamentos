const returnUrl = require("../controllers/returnUrl");
const Colaborador = require("../models/database/colaborador");
const Status = require("../models/database/status");
const Treinamento = require("../models/database/treinamento");
const returnFormattedData = require('../controllers/returnFormattedData')

const listInformationsSpreadsheets = async (data) => {
    const { table, title, myAttributes, layout, successMessage, errorMessage, req, res } = data;


    const url = {
        url: returnUrl(req),
        route: data.getData,
        remove: data.removeItemRoute,
        save: data.updateItemRoute,
        add: data.addItemRoute
    };

    const itemTableName = await table.getTableName();
    const itemReq = await table.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] },});

    let itens = []

    if (itemTableName === 'treinamentos_colaborador') {

        const itemReq = await table.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Colaborador,
                    required: true,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Status,
                    required: true,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Treinamento,
                    required: true,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            order: [
                ['inicio', 'ASC'],
              ],
        });


        itens = itemReq.map(item => {
            return {
                id: item.id,
                matricula: item.Colaborador.dataValues.matricula,
                status: item.Status.dataValues.status,
                treinamento: item.Treinamento.dataValues.treinamento,
                inicio: returnFormattedData(item.inicio),
                termino: returnFormattedData(item.termino)
            }
        });


    } else {
        itens = itemReq.map(item => item.toJSON());
    }


    await res.render(layout, {
        title,
        myAttributes,
        item: JSON.stringify(itens),
        itemTableName,
        url,
        successMessage,
        errorMessage
    });


};


module.exports = listInformationsSpreadsheets