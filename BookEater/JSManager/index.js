const Token = pegaToken()
console.log(Token)
if (!Token){
    window.location.replace("login.html")
}

const Show = (livros) => {
    const div = document.createElement("div")
    let ShowLivros = document.getElementById('livros-tbody')
    for(const livro of livros) {
      div.innerHTML 
        `<tr id="${livro.id}">
            <td class="livro-titulo">${livro.titulo}</td>
            <td class="livro-isbn">${livro.ISBN}</td>
            <td class="livro-autores">${livro.autores.map((el) => { return el.nome }).join(',')}</>
            <td class="livro-editora">${livro.editora.nome}</td>
            <td class="livro-categoria">${livro.categoria.nome}</td>
            <td class="livro-quantidade">${livro.quantidade}</td>
            <td class="livro-preco">${livro.preco}</td>
        </tr>`
    ShowLivros.appendChild(div)
  }
}
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + Token.access);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const livros = fetch("https://livraria-app.herokuapp.com/api/livros/", {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
})
  .then(response => response.json())
  .then(Show);



/* {
    "username": "jose.noal",
    "password" : "MifwOnBa"
}*/