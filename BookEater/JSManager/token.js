function salvaToken(token) {
    localStorage.setItem("TOKEN", JSON.stringify(token))
}

function pegaToken() {
    return JSON.parse(localStorage.getItem("TOKEN"))
}