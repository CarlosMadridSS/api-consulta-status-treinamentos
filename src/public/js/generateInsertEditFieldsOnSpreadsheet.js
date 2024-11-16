
//Modal Edição

async function generateFieldsFromEditCellModal(item, dataApi) {

    const dataObject = await dataApi

    const inputHiddenElement = document.getElementById(`in-ts-${item.id}`)
    const inputHidden = JSON.parse(inputHiddenElement.value)
    const modalBody = document.querySelector('#modal-edit-spreadsheet>.modal-dialog>.modal-content>.modal-body')

    const btnCancelModalSps = document.getElementById('btn-cancel-modal-sps')
    const btnCloseCancelModalSps = document.getElementById('btn-close-cancel-modal-sps')
    btnCancelModalSps.onclick = () => { cleanModalSpreadsheet() }
    btnCloseCancelModalSps.onclick = () => { cleanModalSpreadsheet() }


    //Captura atributos dos dados recebidos
    let proprieties = []

    //Retorna valores para propriedades
    if (proprieties.length === 0 && Object.keys(item).length > 0) {

        for (key in item) {
            proprieties.push(key)
        }

        if (proprieties.length > 0) {
            proprieties.sort()
        }
    }

    //Verifica se tabela através de verificação de atributos

    const hasProprieties = isARelationalTable(proprieties, ['id', 'matricula', 'status', 'treinamento', 'inicio', 'termino'])

    if (hasProprieties) {
        for (const key in inputHidden) {
            if (key !== 'inicio' && key !== 'termino')
                generateSelectFieldsFromEditCellModalInternals(key, inputHidden, modalBody, dataObject)
            else
                generateDateFieldsFromEditCellModalInternals(key, inputHidden, modalBody)

        }

    } else {
        for (const key in inputHidden) {
            generateInputFieldsFromEditCellModalInternals(key, inputHidden, modalBody)
        }
    }

}


function convertDateStyle(data) {

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);

    const day = match[1];
    const month = match[2];
    const year = match[3];

    return `${year}-${month}-${day}`;
}


function generateDateFieldsFromEditCellModalInternals(key, inputHidden, modalBody) {
    const div = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')

    if (key === 'inicio' || key === 'termino') {
        div.classList.add('mb-3')
        label.setAttribute('for', `${key}`)
        label.classList.add('form-label')
        label.innerText = key

        input.type = 'date'
        input.classList.add('form-control', 'border-black')
        input.id = `${key}`
        input.value = convertDateStyle(inputHidden[key])
        input.name = key
        input.required = true

        div.appendChild(label)
        div.appendChild(input)

        modalBody.append(div)
    }
}



//Modal Edição - Campos Internos - Input
function generateInputFieldsFromEditCellModalInternals(key, inputHidden, modalBody) {

    const div = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const inputFormHidden = document.createElement('input')

    if (inputHidden.hasOwnProperty(key)) {

        if (key === 'id') {
            div.classList.add('mb-3')
            label.setAttribute('for', `${key}`)
            label.classList.add('form-label')
            label.innerText = key

            input.type = 'text'
            input.classList.add('form-control')
            input.id = `${key}`
            input.value = inputHidden[key]
            //input.name = key
            input.disabled = true

            inputFormHidden.type = 'hidden'
            inputFormHidden.id = `hidden-form-input-${inputHidden[key]}`
            inputFormHidden.value = inputHidden[key]
            inputFormHidden.name = key

            div.appendChild(label)
            div.appendChild(input)

            modalBody.appendChild(div)
            modalBody.appendChild(inputFormHidden)

        } else {
            div.classList.add('mb-3')
            label.setAttribute('for', `${key}`)
            label.classList.add('form-label')
            label.innerText = key

            key === 'matricula' ? input.type = 'number' : input.type = 'text'
            input.classList.add('form-control', 'border-black')
            input.id = `${key}`
            input.value = inputHidden[key]
            input.name = key
            input.required = true

            div.appendChild(label)
            div.appendChild(input)

            modalBody.append(div)
        }
    }


    $('#modal-edit-spreadsheet').modal('show')

}



//Modal Edição - Campos Internos - Select
function generateSelectFieldsFromEditCellModalInternals(key, inputHidden, modalBody, dataObject) {

    const div = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const inputFormHidden = document.createElement('input')

    if (inputHidden.hasOwnProperty(key)) {

        if (key === 'id') {
            div.classList.add('mb-3')
            label.setAttribute('for', `${key}`)
            label.classList.add('form-label')
            label.innerText = key

            input.type = 'text'
            input.classList.add('form-control')
            input.id = `${key}`
            input.value = inputHidden[key]
            //input.name = key
            input.disabled = true

            inputFormHidden.type = 'hidden'
            inputFormHidden.id = `hidden-form-input-${inputHidden[key]}`
            inputFormHidden.value = inputHidden[key]
            inputFormHidden.name = key

            div.appendChild(label)
            div.appendChild(input)

            modalBody.appendChild(div)
            modalBody.appendChild(inputFormHidden)

        } else {
            div.classList.add('mb-3')
            label.setAttribute('for', `${key}`)
            label.classList.add('form-label')
            label.innerText = key
            const select = document.createElement('select')
            const optionExt = document.createElement('option')

            key === 'matricula' ? input.type = 'number' : input.type = 'text'
            select.classList.add('form-control', 'border-black', 'form-select')
            select.id = `${key}`
            select.name = key
            select.required = true


            for (keyDataObj in dataObject) {
                if (keyDataObj == key) {


                    dataObject[keyDataObj].forEach(item => {
                        //console.log(item[keyDataObj])

                        if (inputHidden[key] == item[keyDataObj]) {
                            optionExt.innerText = item[keyDataObj]
                            optionExt.value = item.id
                            optionExt.selected = true

                            select.appendChild(optionExt)

                        }

                        const optionInt = document.createElement('option')
                        optionInt.innerText = item[keyDataObj]
                        optionInt.value = item.id

                        select.appendChild(optionInt)

                    })



                    //console.log('É igual')
                }
            }


            //console.log(inputHidden[key])


            div.appendChild(label)
            div.appendChild(select)

            modalBody.append(div)
        }
    }


    $('#modal-edit-spreadsheet').modal('show')

}