let localData = {data:[]}

const generateTablesSpreadsheet = async (reqData) => {
    const headTable = document.getElementById('head-table');
    const bodyTable = document.getElementById('body-table');
    
    const data = await reqData

    if (data.length > 0) {
        const keys = Object.keys(data[0]);

        // Criação do cabeçalho da tabela
        for (const key of keys) {
            const tableHeadElement = document.createElement('th');
            tableHeadElement.setAttribute('scope', 'col');
            key === 'id' ? tableHeadElement.innerText = '#' : tableHeadElement.innerText = key
            headTable.appendChild(tableHeadElement);

        }

        // Criação do corpo da tabela
        data.forEach((item, index) => {
            const trElement = document.createElement('tr');
            trElement.id = `tr-${item.id}`;
            bodyTable.appendChild(trElement);

            keys.forEach((key) => {
                if (key === 'id') {
                    const tdElement = document.createElement('td');
                    tdElement.classList.add('border', 'border-1', 'border-dark-subtle');
                    tdElement.innerText = (index + 1)
                    trElement.appendChild(tdElement)

                }else{
                    const tdElement = document.createElement('td');
                    const inputElement = document.createElement('input');
    
                    tdElement.classList.add('border', 'border-1', 'border-dark-subtle');
                    inputElement.classList.add('unstyled-input', 'total-size');
                    inputElement.type = 'button';    
                    inputElement.value = item[key];
                    inputElement.onclick = ()=>{generateFieldsFromEditCellModal(item, getValuesFromApi ())}
    
                    tdElement.appendChild(inputElement);
                    trElement.appendChild(tdElement);
                }                
            });

            hiddenInformationsCell(item)

            
        });

        localData.data = await data
    }

    checkIfTableIsEmpty()

}


function hiddenInformationsCell(item) {
    
    const rowCells = document.getElementById(`tr-${item.id}`)

        const inputHidden = document.createElement('input')

        inputHidden.type ='hidden'
        inputHidden.id = `in-ts-${item.id}`
        inputHidden.value = JSON.stringify(item)
    
        rowCells.appendChild(inputHidden)

}


function cleanModalSpreadsheet(){
    const modalBody = document.querySelector('#modal-edit-spreadsheet>.modal-dialog>.modal-content>.modal-body')

    if(modalBody.firstChild) {
        modalBody.innerText = ''
    }

}



function searchInSpreadsheet(data) {
    const btnSearchInput = document.getElementById('search-spreadsheet');
    const searchInputSpreadsheet = document.getElementById('input-search-spreadsheet');
    const bodyTable = document.getElementById('body-table');
    const headTable = document.getElementById('head-table');



    btnSearchInput.addEventListener('click', () => {

        const searchTerm = searchInputSpreadsheet.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const results = data.filter(item => {
            return Object.values(item).some(value => 
                String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm)
            );
        });

        headTable.innerText = ''
        bodyTable.innerText = ''
        generateTablesSpreadsheet(results)
    });
}



function saveCellModal() {

    document.getElementById('button-insert-spreadsheet').onclick = () => {

        $('#offcanvasDarkNavbar').offcanvas('hide');

        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }

        $('#modal-insert-spreadsheet').modal('show')
 
    }
    
}



function recuperateAttributesFromSpreadsheet (attributes) {

    const currentPageBtn = document.getElementById('current-page-btn')

    currentPageBtn.onclick = () => window.location.reload()

    const internalAttributeParsed = attributes.split(',');

    saveCellModal(localData.data, internalAttributeParsed)
}



function generateFieldsFromSaveCellModal(modalBody, data) {
    if (modalBody.childNodes.length === 1){
        for(const key in data[0]){
            if(key !== 'id') {

                const div = document.createElement('div')
                const label = document.createElement('label')
                const input = document.createElement('input')
        
                div.classList.add('mb-3')
                label.setAttribute('for', `${key}`)
                label.classList.add('form-label')
                label.innerText = key
        
                key === 'matricula'? input.type = 'number' : input.type = 'text'

                input.classList.add('form-control','border-black')
                input.name = key;
                input.id = key;

                input.required = true
        
                div.appendChild(label)
                div.appendChild(input)
        
                modalBody.append(div)    
            }

        }
    }
}


const checkIfTableIsEmpty = () => {
    const bodyTable = document.getElementById('body-table')
    
    if(bodyTable.childElementCount == 0){

        
        const div = document.createElement('div')
        const btn = document.createElement('button')

        div.classList.add('d-flex', 'justify-content-center', 'flex-row', 'w-100')

        btn.classList.add('btn', 'btn-secondary', 'bg-secondary', 'text-light', 'my-3')
        btn.innerText = 'Adicionar Item'
        btn.onclick = () => {
            $('#modal-insert-spreadsheet').modal('show')
        }


        div.appendChild(btn)
        bodyTable.appendChild(div)
    }
}




