function login(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    let User = formData.get("User")
    let Pass = formData.get("Pass")

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "username": User,
    "password": Pass
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://livraria-app.herokuapp.com/api/token/", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (!result.access){
            return
        }
        salvaToken(result)
        window.location.replace("index.html")
    } )
        
    .catch(error => alert("ERRO! BURRO", error));
}

document.getElementById("form").addEventListener("submit", login)