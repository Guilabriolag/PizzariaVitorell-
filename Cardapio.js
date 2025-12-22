const sabores = [
    { nome: "4 Queijos", ingredientes: "Mussarela, parmesão, provolone e gorgonzola", inteira: 47, broto: 37, categoria: "pizza" },
    { nome: "Calabresa", ingredientes: "Calabresa fatiada, cebola e azeitonas", inteira: 38, broto: 29, categoria: "pizza" },
    { nome: "Frango Catupiry", ingredientes: "Frango desfiado com o legítimo Catupiry", inteira: 47, broto: 37, categoria: "pizza" },
    { nome: "Portuguesa", ingredientes: "Presunto, ovos, ervilha, cebola e mussarela", inteira: 50, broto: 40, categoria: "pizza" },
    { nome: "Marguerita", ingredientes: "Mussarela, tomate fatiado e manjericão", inteira: 40, broto: 30, categoria: "pizza" },
    { nome: "Banana", ingredientes: "Banana, açúcar e canela", inteira: 41, broto: 31, categoria: "doce" },
    // Bebidas Atualizadas
    { nome: "Coca-Cola 2L", ingredientes: "Refrigerante", preco: 18, categoria: "bebidas" },
    { nome: "Coca-Cola Zero 2L", ingredientes: "Refrigerante sem açúcar", preco: 18, categoria: "bebidas" },
    { nome: "Guaraná Kuat 2L", ingredientes: "Refrigerante", preco: 12, categoria: "bebidas" },
    { nome: "Heineken Long Neck", ingredientes: "Cerveja Premium", preco: 10, categoria: "bebidas" }
];

let categoriaAtual = 'pizza';
let modoMeia = false;
let selecionadosMeia = [];

function selecionar(cat) {
    categoriaAtual = cat;
    document.getElementById('subnav').style.display = (cat === 'pizza' || cat === 'broto') ? 'grid' : 'none';
    mostrar('inteira');
}

function mostrar(tipo) {
    modoMeia = (tipo === 'meia');
    const container = document.getElementById('sabores');
    container.innerHTML = '';
    selecionadosMeia = [];

    const filtrados = sabores.filter(s => {
        if (categoriaAtual === 'calzone') return s.categoria === 'pizza'; // Calzone aceita sabores salgados
        if (categoriaAtual === 'bebidas') return s.categoria === 'bebidas';
        return s.categoria === 'pizza' || s.categoria === 'doce';
    });

    filtrados.forEach(s => {
        let precoExibicao;
        if (categoriaAtual === 'pizza') precoExibicao = s.inteira;
        else if (categoriaAtual === 'broto') precoExibicao = s.broto;
        else if (categoriaAtual === 'calzone') precoExibicao = s.broto; // REGRA: Preço Calzone = Broto
        else precoExibicao = s.preco;

        if (!precoExibicao) return;

        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>${s.nome}</h3>
            <p>${s.ingredientes}</p>
            <div style="display:flex; justify-content:space-between; align-items:center">
                <span style="font-weight:bold; font-size:1.2rem">R$ ${precoExibicao.toFixed(2)}</span>
                <button onclick="adicionar('${s.nome}', ${precoExibicao})">Adicionar</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function adicionar(nome, preco) {
    const cart = document.getElementById('pedido');
    const label = categoriaAtual.toUpperCase();

    if (modoMeia && (categoriaAtual === 'pizza' || categoriaAtual === 'broto')) {
        selecionadosMeia.push({nome, preco});
        showCustomAlert("Meia-Meia", `Sabor ${selecionadosMeia.length}: ${nome} ok!`);
        
        if (selecionadosMeia.length === 2) {
            const pFinal = Math.max(selecionadosMeia[0].preco, selecionadosMeia[1].preco);
            cart.value += `MEIA ${selecionadosMeia[0].nome} / MEIA ${selecionadosMeia[1].nome} - R$ ${pFinal.toFixed(2)}\n`;
            selecionadosMeia = [];
        }
    } else {
        cart.value += `${label}: ${nome} - R$ ${preco.toFixed(2)}\n`;
        showCustomAlert("Sucesso", `${nome} adicionado!`);
    }
}

function toggleCarrinho() {
    document.getElementById('carrinho').classList.toggle('open');
}

function mostrarDados(tipo) {
    document.getElementById('pedidoDetalhes').style.display = 'block';
    document.getElementById('entregaCampos').style.display = (tipo === 'delivery') ? 'block' : 'none';
}

function enviarPedido() {
    const itens = document.getElementById('pedido').value;
    if (!itens) return showCustomAlert("Ops", "Seu carrinho está vazio!");

    const pag = document.getElementById('pagamento').value;
    let msg = `*NOVO PEDIDO VETORELLI*\n\n${itens}`;
    
    if (document.getElementById('entregaCampos').style.display === 'block') {
        msg += `\n📍 Entrega em: ${document.getElementById('endereco').value} (${document.getElementById('bairro').value})`;
    } else {
        msg += `\n🏃 Retirada no local`;
    }

    msg += `\n💳 Pagamento: ${pag}`;
    window.open(`https://wa.me/5511993407322?text=${encodeURIComponent(msg)}`);
}

function showCustomAlert(t, m) {
    document.getElementById('custom-alert-title').innerText = t;
    document.getElementById('custom-alert-message').innerText = m;
    document.getElementById('custom-alert-overlay').classList.add('show');
}

function hideCustomAlert() {
    document.getElementById('custom-alert-overlay').classList.remove('show');
}
