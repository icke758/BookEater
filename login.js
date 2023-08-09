const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const errorMessage = document.getElementById('errorMessage');


loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(loginForm)
    const username = formData.get("username");
    const password = formData.get("password");


    const credentials = {
        username: username,
        password: password
    };

    console.log(credentials)

    fetch('https://livraria-app.herokuapp.com/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Credenciais inválidas');
        }
    })
    .then(data => {
        localStorage.setItem('TOKEN', JSON.stringify(data));
        window.location.replace('index.html');
    })
    .catch(error => {
        console.error(error.message);
    });
});

