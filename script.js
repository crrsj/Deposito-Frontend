
function cadastrarRegistro(nome,imagem,quantidade,valor,estoque,total,status) {
    
    // Captura os valores do formulário
    
    var  nome = document.getElementById("nome" ).value;
    var  imagem = document.getElementById("imagem").value;
    var  quantidade = document.getElementById("quantidade").value;
    var  valor = document.getElementById("valor").value;
    var  estoque = document.getElementById("estoque").value;
    var  status = document.getElementById("status").value;
   // validarFormulario();
   
    // Cria um objeto com os dados a serem enviados
    var data = {
        
        nome: nome,
        imagem: imagem,
        quantidade: quantidade,
        valor: valor,
        estoque: estoque,       
        status: status
        
        
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
     document.getElementById("nome").value ="";
     document.getElementById("imagem").value ="";
     document.getElementById("quantidade").value ="";
     document.getElementById("valor").value ="";
     document.getElementById("estoque").value ="";     
     document.getElementById("status").value ="";
   
    // window.location.href = "";
   
}


    function validarFormulario() { 
    
    var nome = document.getElementById('nome').value;
    var imagem = document.getElementById('imagem').value;
    var quantidade = document.getElementById('quantidade').value;
    var valor = document.getElementById('valor').value;
    var estoque = document.getElementById('estoque').value;    
    var status =  document.getElementById("status").value;
 
    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }
    if (imagem === '') {
        alert('Por favor, preencha o campo imagem.');
        return false;
    }
    if (quantidade === '') {
        alert('Por favor, preencha o campo quantidade.');
        return false;
    }
    if (valor === '') {
        alert('Por favor, preencha o campo valor.');
        return false;
    }

    if (estoque === '') {
        alert('Por favor, preencha o campo estoque.');        
        return false;
    }

    
    if (status === '') {
        alert('Por favor, preencha o campo status.');
        return false;
    }

   
   
     cadastrarRegistro(nome,imagem,quantidade,valor,estoque,status);

    
    return true;
}

// Função para buscar dados da API e preencher a tabela
async function fetchDataAndPopulateTable() {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API
      const response = await fetch( 'http://localhost:8080/produtos');
      const data = await response.json();

      // Limpa a tabela antes de inserir novos dados
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';

      // Preenche a tabela com os dados recebidos da API
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
         
          <td>${item.id}</td>          
          <td>${item.nome}</td>       
          <td><img src="${item.imagem}" alt="${item.nome}" style="max-width: 100px; max-height: 100px;"></td>   
          <td>${item.quantidade}</td>          
          <td>${item.valor}</td>
          <td>${item.estoque}</td> 
          <td>${item.total}</td>          
          <td>${item.status}</td>
          <td><button  class="btn btn-success"onclick="buscarDados(${item.id})">Comprar</button></td>`;               
         
        
          
          tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao buscar e preencher dados:', error);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para buscar e preencher os dados quando a página carrega
   fetchDataAndPopulateTable();
});


async function buscarDados(id) {
    try { 
        // URL da API, substitua pela sua URL
        const response = await fetch(`http://localhost:8080/produtos/${id}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        // Converte a resposta em JSON
        const data = await response.json();
        openModal();



document.getElementById('id').value = data.id;
document.getElementById('nome').value = data.nome;
document.getElementById('imagem').value = data.imagem;
document.getElementById('quantidade').value = data.quantidade;  
document.getElementById('valor').value = data.valor;
document.getElementById('estoque').value = data.estoque;
document.getElementById('total').value = data.total; 
document.getElementById('status').value = data.status;



} catch (error) {
console.error('Erro:', error);
}
}
    

function openModal() {

// Seleciona o modal pelo ID
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

// Abre o modal
myModal.show();

}