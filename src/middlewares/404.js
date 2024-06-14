const path = require('path')

const erro404 = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../public/views/erro404.html'));
  }


module.exports = erro404;