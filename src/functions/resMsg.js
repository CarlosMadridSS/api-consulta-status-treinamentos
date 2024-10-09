

const feedbackMessage = (msg, res) => {
    console.log(msg)
    res.send(msg)
}


module.exports = feedbackMessage