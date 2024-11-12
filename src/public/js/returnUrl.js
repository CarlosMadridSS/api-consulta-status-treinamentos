function returnUrl(){
    const urlObj = {
        protocol: window.location.protocol,
        host: window.location.host
    }
    return `${urlObj.protocol}//${urlObj.host}`
}