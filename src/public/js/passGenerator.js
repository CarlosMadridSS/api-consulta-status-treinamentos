function passGenerator(length) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_-+=<>?';
    
    const allCharacters = lowercase + uppercase + numbers + symbols;
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}



const btnGeneratePass = document.getElementById('btn-generate-pass')

btnGeneratePass.onclick = () => {
    const passwordLength = 12;
    const newPassword = passGenerator(passwordLength);
    
    const passElement = document.getElementsByName('senha')[0]
    
    passElement.value = newPassword;
}




