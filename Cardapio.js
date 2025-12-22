const sabores = [
    { nome: "4 Queijos", ingredientes: "molho, mussarela, parmesão, provolone, gorgonzola, azeitona e orégano", inteira: 47, broto: 37, categoria: "pizza" },
    { nome: "5 Queijos", ingredientes: "molho, mussarela, parmesão, provolone, gorgonzola, catupiry, azeitona e orégano", inteira: 49, broto: 39, categoria: "pizza" },
    { nome: "Abobrinha I", ingredientes: "molho, mussarela, abobrinha, alho frito, azeitona e orégano", inteira: 41, broto: 34, categoria: "pizza" },
    { nome: "Alho", ingredientes: "molho, mussarela, alho frito, azeitona e orégano", inteira: 45, broto: 35, categoria: "pizza" },
    { nome: "Aliche", ingredientes: "molho, mussarela, aliche, tomate, azeitona e orégano", inteira: 49, broto: 39, categoria: "pizza" },
    { nome: "Americana", ingredientes: "molho, mussarela, lombinho, pimentão, champignon, tomate cereja, azeitona e orégano", inteira: 50, broto: 40, categoria: "pizza" },
    { nome: "Atum I", ingredientes: "molho, atum, cebola, azeitona e orégano", inteira: 46, broto: 36, categoria: "pizza" },
    { nome: "Bacon", ingredientes: "molho, mussarela, bacon, azeitona e orégano", inteira: 44, broto: 34, categoria: "pizza" },
    { nome: "Brócolis", ingredientes: "molho, brócolis, mussarela, bacon, azeitona e orégano", inteira: 47, broto: 38, categoria: "pizza" },
    { nome: "Calabresa I", ingredientes: "molho, calabresa, tomate, cebola, azeitona e orégano", inteira: 38, broto: 29, categoria: "pizza" },
    { nome: "Frango Catupiry", ingredientes: "molho, frango, catupiry, azeitona e orégano", inteira: 47, broto: 37, categoria: "pizza" },
    { nome: "Marguerita", ingredientes: "molho, mussarela, parmesão, tomate, manjericão", inteira: 40, broto: 30, categoria: "pizza" },
    { nome: "Mussarela", ingredientes: "molho, mussarela, tomate, azeitona", inteira: 38, broto: 29, categoria: "pizza" },
    { nome: "Portuguesa", ingredientes: "molho, mussarela, presunto, ovo, ervilha, tomate", inteira: 50, broto: 40, categoria: "pizza" },
    { nome: "Anita e Garibaldi", ingredientes: "parmesão e goiabada", inteira: 45, broto: 35, categoria: "doce" },
    { nome: "Banana", ingredientes: "banana, açúcar, doce de leite e canela", inteira: 41, broto: 31, categoria: "doce" },
    { nome: "Calzone Frango", ingredientes: "frango, catupiry, azeitona", inteira: 37, broto: null, categoria: "calzone" },
    { nome: "Coca-Cola 2L", ingredientes: "Refrigerante", inteira: 18, broto: null, categoria: "bebidas" },
    { nome: "Guaraná 2L", ingredientes: "Refrigerante", inteira: 18, broto: null, categoria: "bebidas" }
];

let categoriaAtual = '';
let modoMeia = false;
let saboresMeia = [];

function selecionar(cat) {
    categoriaAtual = cat;
    document.getElementById('sabores').style.display = 'block';
    document.getElementById('subnav').style.display = (cat === 'pizza' || cat === 'broto') ? 'block' : 'none';
    mostrar('inteira');
}

function mostrar(tipo) {
    modoMeia = (tipo === 'meia');
    const container = document.getElementById('sabores');
    container.innerHTML = '';
    saboresMeia = [];

    const filtrados = sabores.filter(s => {
        if (categoriaAtual === 'pizza' || categoriaAtual === 'broto') {
            return s.categoria === 'pizza' || s.categoria === 'doce';
        }
        return s.categoria === categoriaAtual;
    });

    filtrados.forEach(s => {
        let preco = (categoriaAtual === 'broto') ? s.broto : s.inteira;
        if (categoriaAtual === 'calzone') preco = 37;
        if (!preco) return;

        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <h3>${s.nome}</h3>
            <p>${s.ingredientes}</p>
            <p><strong>R$ ${preco.toFixed(2)}</strong></p>
            <button onclick="adicionar('${s.nome}', ${preco})">Adicionar</button>
        `;
        container.appendChild(div);
    });
}

function adicionar(nome, preco) {
    const txt = document.getElementById('pedido');
    if (modoMeia) {
        if (saboresMeia.length < 2) {
            saboresMeia.push({nome, preco});
            showCustomAlert("Vitorelli", `Sabor 1: ${nome}. Selecione o segundo.`);
            if (saboresMeia.length === 2) {
                const finalP = Math.max(saboresMeia[0].preco, saboresMeia[1].preco);
                txt.value += `Pizza Meia: ${saboresMeia[0].nome} / ${saboresMeia[1].nome} - R$ ${finalP.toFixed(2)}\n`;
                saboresMeia = [];
            }
        }
    } else {
        const prefixo = categoriaAtual.toUpperCase();
        txt.value += `${prefixo}: ${nome} - R$ ${preco.toFixed(2)}\n`;
        showCustomAlert("Sucesso", `${nome} adicionado!`);
    }
}

function toggleCarrinho() {
    const c = document.getElementById('carrinho');
    c.style.bottom = (c.style.bottom === '0px') ? '-100%' : '0px';
}

function mostrarDados(tipo) {
    document.getElementById('pedidoDetalhes').style.display = 'block';
    document.getElementById('entregaCampos').style.display = (tipo === 'delivery') ? 'block' : 'none';
}

function mostrarTroco() {
    const p = document.getElementById('pagamento').value;
    document.getElementById('trocoArea').style.display = (p === 'Dinheiro') ? 'block' : 'none';
}

function trocoValor() {
    const v = document.getElementById('precisaTroco').value;
    document.getElementById('valorTroco').style.display = (v === 'Sim') ? 'block' : 'none';
}

function enviarPedido() {
    const p = document.getElementById('pedido').value;
    if (!p) return alert("Carrinho vazio!");

    let msg = `*NOVO PEDIDO VITORELLI*\n\n${p}`;
    
    if (document.getElementById('entregaCampos').style.display === 'block') {
        const end = document.getElementById('endereco').value;
        const bai = document.getElementById('bairro').value;
        if (!end || !bai) return alert("Preencha o endereço!");
        msg += `\n📍 *Entrega:* ${end}\n🏘️ *Bairro:* ${bai}`;
    } else {
        msg += `\n🏃 *Retirada no Balcão*`;
    }

    const pag = document.getElementById('pagamento').value;
    msg += `\n💳 *Pagamento:* ${pag}`;
    
    if (pag === 'Dinheiro' && document.getElementById('precisaTroco').value === 'Sim') {
        msg += `\n💵 *Troco para:* R$ ${document.getElementById('valorTroco').value}`;
    }

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
