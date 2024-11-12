const multer = require('multer');

function configMulter() {
    // Configuração do multer para armazenamento em memória
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    return upload;
}

module.exports = configMulter;
