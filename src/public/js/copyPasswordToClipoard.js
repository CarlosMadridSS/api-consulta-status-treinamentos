function copyPasswordToClipoard(idCopyBtn, idPasswordTd) {
    const copyButtonPassword = document.getElementById(idCopyBtn)

    const passwordTd = document.getElementById(idPasswordTd).innerText

    navigator.clipboard.writeText(passwordTd)
        .then(() => {
            copyButtonPassword.innerText = 'Copiado!'
            console.log('Valor copiado para o clipboard!');
        })
        .catch(err => {
            console.error('Erro ao copiar: ', err);
        });
}