async function getValuesFromApi () {
    if (window.location.pathname === '/admin/manage-spreadsheet/treinamento-colaborador/edit') {

        let dataObject = {
            matricula: [],
            status: [],
            treinamento: []
        }

        const urls = [
            `${returnUrl()}/colaborador/get`,
            `${returnUrl()}/status/get`,
            `${returnUrl()}/treinamentos/get`
        ];
        
        const [matricula, statuses, treinamento] = await Promise.all(urls.map(url => getDatasFromRoute(url)));
        
        dataObject = {
            matricula,
            status: statuses,
            treinamento
        };
        return dataObject
    }
}




