let cart = [];
let id_cliente_logado = localStorage.getItem('clienteId')
// Função para renderizar o carrinho
// Função para renderizar o carrinho na tela
async function loadCartFromServer() {
    try {
 
        const response = await fetch("http://localhost:3002/carrinho/" + id_cliente_logado, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar o carrinho');
        }

        const items = await response.json();
        console.log('Carrinho carregado do servidor:', items);

        // Atualiza a variável local cart e renderiza na tela
        cart = items;
        renderCart();
    } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
        alert('Não foi possível carregar o carrinho.');
    }
}
    // Atualizar o total do carrinho na tela

// Função para adicionar itens ao carrinho
async function addToCart(id_prod, produto, descricao, preco, estoque = 1, id_cliente = id_cliente_logado) {
    const item = {
        id_prod,
        produto,
        descricao,
        preco: parseFloat(preco),
        estoque,
        id_cliente
    };

    console.log(item);

    try {
        const response = await fetch('http://localhost:3002/carrinho', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(item),
        });
  
        if (!response.ok) {
            throw new Error('Erro ao adicionar ao carrinho' + Error);
            //console.log(Error);
        }

        const result = await response.json();
        console.log('Item adicionado ao servidor:', result);

        // Atualizar o carrinho local (opcional, se o servidor retorna o estado atualizado)
        cart.push(item);
        renderCart(); // Atualiza a interface local
        window.location.href = 'carrinho.html';
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        window.location.href = 'carrinho.html';
    }
}

async function removeFromCart(id_prod) {
    try {
        const response = await fetch(`http://localhost:3002/carrinho/${id_prod}/${localStorage.getItem('clienteId')}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao remover do carrinho');
        }

        console.log(`Produto ${id_prod} removido do servidor`);

        // Atualiza o carrinho local e renderiza
        cart = cart.filter(item => item.id_prod !== id_prod);
        renderCart();
    } catch (error) {
        console.error('Erro ao remover do carrinho:', error);
        alert('Não foi possível remover o item do carrinho.');
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartContainer'); // Contêiner do carrinho
    const totalPriceElement = document.getElementById('totalPrice'); // Elemento para exibir o total
    cartContainer.innerHTML = ''; // Limpa o conteúdo existente do carrinho

    let total = 0; // Variável para calcular o total

    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        totalPriceElement.textContent = ''; // Esconde o total se não há itens
        return;
    }

    // Itera pelos itens do carrinho e os renderiza
    cart.forEach(item => {
        // Cria um elemento para o item do carrinho
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item'); // Classe para estilizar o item (opcional)

        // Adiciona o conteúdo ao item
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div>
                    <h3>${item.descricao}</h3>
                    <p>Quantidade: ${item.qt_prod}</p>
                    <p>Preço Unitário: R$ ${item.punit}</p>
                    <p>Total: R$ ${(item.qt_prod * item.punit)}</p>
                </div>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id_prod})">Remover</button>
            </div>
        `;

        // Adiciona o item ao contêiner do carrinho
        cartContainer.appendChild(cartItem);

        // Atualiza o total
        total += item.punit * item.qt_prod;
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    // Atualiza o elemento de preço total
    totalPriceElement.textContent = `Total do Carrinho: R$ ${total}`;
}

async function cadastrarCliente(cliente, email, senha) {
    const url = 'http://localhost:3003/cliente'; // Substitua pela URL do seu endpoint
    const data = {
        cliente: cliente,
        email: email,
        senha: senha,
        dt_cadastro: new Date().toISOString().split('T')[0] // Obtém a data atual no formato YYYY-MM-DD
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Cliente cadastrado com sucesso:', result);
        alert('Cadastro realizado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Não foi possível realizar o cadastro. Tente novamente.');
    }
}
