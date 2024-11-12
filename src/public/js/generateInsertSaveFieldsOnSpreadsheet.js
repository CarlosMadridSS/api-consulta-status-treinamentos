
async function generateInsertSaveFieldsOnSpreadsheet(data, url, myAttributes, dataApi) {

    const dataObject = await dataApi

    //Captura elemento ModalBody
    const modalBody = document.querySelector('#modal-insert-spreadsheet>.modal-dialog>.modal-content>.modal-body')

    //Captura atributos dos dados recebidos
    let proprieties = []

    //Retorna valores para propriedades
    if (proprieties.length === 0) {
        proprieties = myAttributes.split(",")

        if (proprieties.includes('colaborador')) {
            proprieties = proprieties.filter(item => item !== 'colaborador')
            proprieties.push('matricula')
        }

        proprieties.sort()
    } else {
        for (const key in data[0]) {
            proprieties.push(key)
        }
    }


    //Verifica se tabela através de verificação de atributos

    const hasProprieties = isARelationalTable(proprieties, ['id', 'matricula', 'status', 'treinamento', 'inicio', 'termino'])


    //Verifica se há dados na planilha atual e se faz parte daplanilha relacionada
    if (data.length === 0 && hasProprieties) {

        generateSelectFieldsFromSaveCellModal(modalBody, data, proprieties, dataObject)

    } else if (data.length === 0 && !hasProprieties) {

        generateInputFieldsFromSaveCellModal(modalBody, data, proprieties)

    } else if (data.length > 0 && hasProprieties) {

        generateSelectFieldsFromSaveCellModal(modalBody, data, proprieties, dataObject)

    } else if (data.length > 0 && !hasProprieties) {

        generateInputFieldsFromSaveCellModal(modalBody, data, proprieties)

    }

}


async function getDatasFromRoute(url) {
    let dadosArmazenados;

    await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro em resposta da rede');
            }
            return response.json();
        })
        .then(async data => {

            dadosArmazenados = await data;
        })
        .catch(error => {
            console.error('Houve um problema com a requisição:', error);
        });

    return dadosArmazenados
}



function generateInputFieldsFromSaveCellModal(modalBody, data, proprieties) {

    if (modalBody.childNodes.length === 1) {
        if (data.length > 0) {
            for (const key in data[0]) {
                generateInputFieldsFromSaveCellModalInternals(modalBody, key, proprieties)
            }
        } else {
            proprieties.forEach(key => {
                generateInputFieldsFromSaveCellModalInternals(modalBody, key, proprieties)
            })
        }
    }
}

function isARelationalTable(proprieties, arrayCompare) {
    const aCheck = arrayCompare
    const hasProprieties = aCheck.every(proprietie => proprieties.includes(proprietie))
    return hasProprieties
}


function generateInputFieldsFromSaveCellModalInternals(modalBody, key) {
    if (key !== 'id') {
        const div = document.createElement('div')
        const label = document.createElement('label')
        const input = document.createElement('input')

        div.classList.add('mb-3')
        label.setAttribute('for', `${key}`)
        label.classList.add('form-label')
        label.innerText = key

        key === 'matricula' ? input.type = 'number' : input.type = 'text'

        input.classList.add('form-control', 'border-black')
        input.name = key;
        input.id = key;

        input.required = true

        div.appendChild(label)
        div.appendChild(input)

        modalBody.append(div)
    }

}


function generateSelectFieldsFromSaveCellModal(modalBody, data, proprieties, dataObject) {
    if (modalBody.childNodes.length === 1) {
        if (data.length > 0) {
            for (const key in data[0]) {
                if (key !== 'id') {
                    generateSelectFieldsFromSaveCellModalInternals(modalBody, key, dataObject)
                }
            }
        } else {
            let attributes = proprieties.filter(item => item !== 'id')

            attributes.forEach(key => {
                generateSelectFieldsFromSaveCellModalInternals(modalBody, key, dataObject)
            })
        }
    }
}

function generateSelectFieldsFromSaveCellModalInternals(modalBody, key, dataObject) {

    if (key !== 'inicio' && key !== 'termino') {
        if (dataObject[key].length > 0) {
            const div = document.createElement('div')
            const label = document.createElement('label')
            const select = document.createElement('select')
            const optionSelected = document.createElement('option')

            div.classList.add('mb-3')
            label.setAttribute('for', `${key}`)
            label.classList.add('form-label')
            label.innerText = key

            select.classList.add('form-control', 'border-black', 'form-select')
            select.name = key;
            select.id = key;
            select.ariaLabel = `Seleção de ${key}`
            select.required = true

            optionSelected.selected = true
            optionSelected.innerText = `Clique para selecionar o valor para ${key}`
            optionSelected.value = '0'


            div.appendChild(label)
            select.appendChild(optionSelected)

            if (dataObject.hasOwnProperty(key)) {
                for (const keyDataObj in dataObject) {
                    if (key === keyDataObj) {
                        if (dataObject[keyDataObj].length >= 0) {
                            dataObject[keyDataObj].forEach(element => {
                                const option = document.createElement('option')
                                option.value = element.id
                                option.innerText = element[keyDataObj]
                                select.appendChild(option)
                            });

                        }
                    }
                }

            }
            div.appendChild(select)
            modalBody.append(div)
        } else {
            const div = document.createElement('div')
            const label = document.createElement('label')
            const input = document.createElement('input')

            div.classList.add('mb-3')
            label.setAttribute('for', `${key}`)
            label.classList.add('form-label')
            label.innerText = key

            input.classList.add('form-control', 'border-black')
            input.name = key;
            input.id = key;
            input.ariaLabel = `Seleção de ${key}`
            input.disabled = true
            input.value = `Na tabela de ${key}, adicione um item para prosseguir.`

            div.appendChild(label)
            div.appendChild(input)
            modalBody.append(div)

        }
    }



}


//Modal Salvamento 
function generateSelectFieldsFromSaveCellModal(modalBody, data, proprieties, dataObject) {


    if (modalBody.childNodes.length === 1) {
        if (data.length > 0) {
            for (const key in data[0]) {
                if (key !== 'id') generateSelectFieldsFromSaveCellModalInternals(modalBody, key, dataObject)
                if (key === 'inicio' || key === 'termino') generateInputDateFieldsFromSaveCellModalInternals(modalBody, key)

            }
        } else {
            let attributes = proprieties.filter(item => item !== 'id')

            attributes.forEach(key => {
                generateSelectFieldsFromSaveCellModalInternals(modalBody, key, dataObject)
                if (key === 'inicio' || key === 'termino') generateInputDateFieldsFromSaveCellModalInternals(modalBody, key)
            })
        }
    }
}




function generateInputDateFieldsFromSaveCellModalInternals(modalBody, key) {

    const div = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')

    div.classList.add('mb-3')
    label.setAttribute('for', `${key}`)
    label.classList.add('form-label')
    label.innerText = key

    input.type = 'date'

    input.classList.add('form-control', 'border-black')
    input.name = key;
    input.id = key;

    input.required = true

    div.appendChild(label)
    div.appendChild(input)

    modalBody.append(div)

}