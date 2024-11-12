let btnChangePass = document.querySelector('#change-pass-btn>button')
const passFields = document.getElementById('generate-pass-fields')
const btnRemovePassFields = document.getElementById('btn-remove-pass-fields')
const inputPass = document.querySelector('#generate-pass-fields>div>input')


if (btnChangePass && passFields) {
    btnChangePass.onclick = () => {
        if (inputPass.disabled && passFields.style.cssText == 'display: none;') {
            passFields.style = 'display: block;'
            inputPass.disabled = false
            inputPass.value = ''
        }

        if (btnChangePass.disabled == false) {
            btnChangePass.disabled = true
            btnChangePass.style = 'display: none;'
        }
    }
}


if (
    btnChangePass != null &&
    passFields != null &&
    btnRemovePassFields != null &&
    inputPass != null
) {

    btnRemovePassFields.onclick = () => {
        
        if
        (
            passFields.style.cssText == 'display: block;' &&
            !inputPass.disabled
        )
        {
            passFields.style = 'display: none;'
            inputPass.disabled = true
        }

        if (btnChangePass.disabled && btnChangePass.style.cssText == 'display: none;') {
            btnChangePass.disabled = !btnChangePass.disabled
            btnChangePass.style = 'display: block;'
        }

    }


}