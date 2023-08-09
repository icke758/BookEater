const token = JSON.parse(localStorage.getItem('TOKEN'))
const dataTableBody = document.querySelector('#dataTable tbody');

// Função para atualizar a tabela com os dados da API
function updateTable() {
    fetch('https://livraria-app.herokuapp.com/api/livros/', {
        headers: {
            'Authorization': 'Bearer ' + token.access
        }
    })
    .then(response => response.json())
    .then(data => {
        dataTableBody.innerHTML = ''; // Limpar a tabela
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.titulo}</td>
                <td>${item.ISBN}</td>
                <td>${item.categoria.nome}</td>
                <td>${item.preco}</td>
                <td>${item.quantidade}</td>
                <td><ul>${item.autores.map(a => "<li>"+ a.nome +"</li>" )}</ul></td>
                <td>${item.editora.nome}</td>
                <td>
                    <a class="btn-details" href="./details.html?id=${item.id}">Details</a>
                    <button class="btn-delete" data-id="${item.id}">Delete</button>
                </td>
            `;
            dataTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.log('Erro ao obter dados da API:', error);
    });
}



// Evento para o botão Delete
dataTableBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');
        
        if (confirm('Are you sure you want to delete this item?')) {
            fetch(`https://sua-api.com/dados/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if (response.ok) {
                    updateTable();
                } else {
                    console.log('Erro ao deletar item:', response.statusText);
                }
            })
            .catch(error => {
                console.log('Erro ao deletar item:', error);
            });
        }
    }
});

// ... (restante do código anterior)

// Atualizar a tabela quando a página é carregada
updateTable();

