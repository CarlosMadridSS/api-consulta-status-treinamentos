function submitInformations(idForm, idBtn, method, action){
    if (idBtn, idForm, method, action) {
        const form = document.getElementById(idForm)
        const btn = document.getElementById(idBtn)

        form.method = method

        btn.onclick = () => {
            form.action = action
            form.submit()
        }
    }
}