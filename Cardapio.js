const sabores = [
  { nome: "4 Queijos", ingredientes: "molho, mussarela, parmesão, provolone, gorgonzola, azeitona e orégano", inteira: 47, broto: 37, categoria: "pizza" },
  { nome: "5 Queijos", ingredientes: "molho, mussarela, parmesão, provolone, gorgonzola, catupiry, azeitona e orégano", inteira: 49, broto: 39, categoria: "pizza" },
  { nome: "Abobrinha I", ingredientes: "molho, mussarela, abobrinha, alho frito, azeitona e orégano", inteira: 41, broto: 34, categoria: "pizza" },
  { nome: "Abobrinha II", ingredientes: "molho, mussarela, abobrinha, pimenta calabresa, azeitona e orégano", inteira: 41, broto: 34, categoria: "pizza" },
  { nome: "Alho", ingredientes: "molho, mussarela, alho frito, azeitona e orégano", inteira: 45, broto: 35, categoria: "pizza" },
  { nome: "Aliche", ingredientes: "molho, mussarela, aliche, tomate, azeitona e orégano", inteira: 49, broto: 39, categoria: "pizza" },
  { nome: "Americana", ingredientes: "molho, mussarela, lombinho, pimentão, champignon, tomate cereja, azeitona sem caroço e orégano", inteira: 50, broto: 40, categoria: "pizza" },
  { nome: "Atum I", ingredientes: "molho, atum, cebola, azeitona e orégano", inteira: 46, broto: 36, categoria: "pizza" },
  { nome: "Atum I (com mussarela)", ingredientes: "molho, mussarela, atum, cebola, azeitona e orégano", inteira: 48, broto: 38, categoria: "pizza" },
  { nome: "Bacon", ingredientes: "molho, mussarela, bacon, azeitona e orégano", inteira: 44, broto: 34, categoria: "pizza" },
  { nome: "Brócolis", ingredientes: "molho, brócolis, mussarela, bacon, azeitona e orégano", inteira: 47, broto: 38, categoria: "pizza" },
  { nome: "Calabresa I", ingredientes: "molho, calabresa, tomate, cebola, azeitona e orégano", inteira: 38, broto: 29, categoria: "pizza" },
  { nome: "Calabresa II", ingredientes: "molho, mussarela, calabresa, cebola, azeitona e orégano", inteira: 43, broto: 34, categoria: "pizza" },
  { nome: "Frango Catupiry", ingredientes: "molho, frango, catupiry, azeitona e orégano", inteira: 47, broto: 37, categoria: "pizza" },
  { nome: "Gênova", ingredientes: "molho, mussarela, provolone, presunto, molho pesto e azeitona", inteira: 48, broto: 37, categoria: "pizza" },
  { nome: "Lombinho", ingredientes: "molho, mussarela, lombinho, provolone, azeitona e orégano", inteira: 46, broto: 36, categoria: "pizza" },
  { nome: "Marguerita", ingredientes: "molho, mussarela, parmesão, tomate, azeitona e manjericão", inteira: 40, broto: 30, categoria: "pizza" },
  { nome: "Mussarela", ingredientes: "molho, mussarela, tomate, azeitona e orégano", inteira: 38, broto: 29, categoria: "pizza" },
  { nome: "Peperonni", ingredientes: "molho, mussarela, peperonni e azeitona", inteira: 49, broto: 39, categoria: "pizza" },
  { nome: "Pomodoro", ingredientes: "molho, parmesão, alho frito, tomate e orégano", inteira: 44, broto: 34, categoria: "pizza" },
  { nome: "Potatosa", ingredientes: "molho, batata, parmesão, calabresa, catupiry, azeitona sem caroço e orégano", inteira: 45, broto: 35, categoria: "pizza" },
  { nome: "Portuguesa", ingredientes: "molho, mussarela, presunto, ovo cozido, ervilha, tomate, azeitona sem caroço e orégano", inteira: 50, broto: 40, categoria: "pizza" },
  { nome: "Rúcula e Tomate Seco", ingredientes: "molho, mussarela, rúcula, tomate seco, azeitona e orégano", inteira: 46, broto: 36, categoria: "pizza" },
  { nome: "Toscana", ingredientes: "molho, mussarela, linguiça calabresa moída, tomate, azeitona e orégano", inteira: 45, broto: 35, categoria: "pizza" },
  { nome: "Anita e Garibaldi", ingredientes: "parmesão e goiabada", inteira: 45, broto: 35, categoria: "doce", tipo: "pizza" },
  { nome: "Banana", ingredientes: "banana, açúcar, doce de leite e canela", inteira: 41, broto: 31, categoria: "doce", tipo: "pizza" },
  { nome: "Calzone de Frango", ingredientes: "molho, frango, catupiry, azeitona e orégano", inteira: 37, broto: null, categoria: "calzone" },
  { nome: "Calzone de Calabresa", ingredientes: "molho, calabresa, cebola, azeitona e orégano", inteira: 37, broto: null, categoria: "calzone" },
  { nome: "Coca-Cola 2L", ingredientes: "Refrigerante", inteira: 18, broto: null, categoria: "bebidas" },
  { nome: "Guaraná Antarctica 2L", ingredientes: "Refrigerante", inteira: 18, broto: null, categoria: "bebidas" },
  { nome: "Guaraná Kuat 2L", ingredientes: "Refrigerante", inteira: 12, broto: null, categoria: "bebidas" },
  { nome: "HEINEKEN", ingredientes: "Cerveja", inteira: 8, broto: null, categoria: "bebidas" }
];

let categoriaAtual = 'pizza';
let modoMeia = false;
let saboresSelecionadosMeia = [];

function selecionar(categoria) {
  categoriaAtual = categoria;
  document.getElementById('sabores').innerHTML = '';
  document.getElementById('sabores').style.display = 'block';

  if (categoria === 'pizza' || categoria === 'broto') {
    document.getElementById('subnav').style.display = 'block';
    mostrar('inteira');
  } else {
    document.getElementById('subnav').style.display = 'none';
    mostrar(null);
  }
}

function mostrar(tipo) {
  modoMeia = (tipo === 'meia');
  const saboresContainer = document.getElementById('sabores');
  saboresContainer.innerHTML = '';
  saboresSelecionadosMeia = [];

  const saboresFiltrados = sabores.filter(sabor => {
    if (categoriaAtual === 'pizza') return (sabor.categoria === 'pizza' || sabor.categoria === 'doce') && sabor.inteira;
    if (categoriaAtual === 'broto') return (sabor.categoria === 'pizza' || sabor.categoria === 'doce') && sabor.broto;
    if (categoriaAtual === 'calzone') return (sabor.categoria === 'calzone');
    return sabor.categoria === categoriaAtual;
  });

  saboresFiltrados.forEach(sabor => {
    const item = document.createElement('div');
    item.className = 'item';
    let preco;

    if (categoriaAtual === 'pizza') preco = sabor.inteira;
    else if (categoriaAtual === 'broto') preco = sabor.broto;
    else if (categoriaAtual === 'calzone') preco = 37;
    else preco = sabor.inteira;

    const precoTexto = preco ? `R$ ${preco.toFixed(2)}` : 'Consulte';

    item.innerHTML = `
      <h3>${sabor.nome}</h3>
      <p>${sabor.ingredientes}</p>
      <p>Preço: ${precoTexto}</p>
      <button onclick="adicionar('${sabor.nome}', ${sabor.inteira}, ${sabor.broto})">Adicionar</button>
    `;
    saboresContainer.appendChild(item);
  });
}

function adicionar(nome, precoInteira, precoBroto) {
  const pedidoArea = document.getElementById('pedido');
  let preco;
  let tipo;

  if (categoriaAtual === 'pizza') { tipo = 'Pizza Inteira'; preco = precoInteira; }
  else if (categoriaAtual === 'broto') { tipo = 'Pizza Broto'; preco = precoBroto; }
  else if (categoriaAtual === 'calzone') { tipo = 'Calzone'; preco = 37; }
  else { tipo = 'Bebida'; preco = precoInteira; }

  if (modoMeia) {
    if (saboresSelecionadosMeia.length < 2) {
      saboresSelecionadosMeia.push({ nome, preco: precoInteira });
      showCustomAlert('Vitorelli', `Sabor ${nome} selecionado! Escolha o próximo.`);
      
      if (saboresSelecionadosMeia.length === 2) {
        const [s1, s2] = saboresSelecionadosMeia;
        const precoFinal = Math.max(s1.preco, s2.preco);
        pedidoArea.value += `Pizza Meia: ${s1.nome} / ${s2.nome} - R$ ${precoFinal.toFixed(2)}\n`;
        showCustomAlert('Vitorelli', `Meia ${s1.nome} e Meia ${s2.nome} adicionadas.`);
        saboresSelecionadosMeia = [];
      }
    }
  } else {
    pedidoArea.value += `${tipo}: ${nome} - R$ ${preco.toFixed(2)}\n`;
    showCustomAlert('Vitorelli', `${nome} adicionado ao carrinho.`);
  }
}

function toggleCarrinho() {
  const carrinho = document.getElementById('carrinho');
  carrinho.style.bottom = (carrinho.style.bottom === '0px') ? '-100%' : '0px';
}

function mostrarDados(tipo) {
  document.getElementById('pedidoDetalhes').style.display = 'block';
  document.getElementById('entregaCampos').style.display = (tipo === 'delivery') ? 'block' : 'none';
}

function mostrarTroco() {
  const forma = document.getElementById('pagamento').value;
  document.getElementById('trocoArea').style.display = (forma === 'Dinheiro') ? 'block' : 'none';
  document.getElementById('valorTroco').style.display = 'none';
}

function trocoValor() {
  const precisa = document.getElementById('precisaTroco').value;
  document.getElementById('valorTroco').style.display = (precisa === 'Sim') ? 'block' : 'none';
}

function enviarPedido() {
  const pedido = document.getElementById('pedido').value.trim();
  if (!pedido) return alert('Seu carrinho está vazio!');

  let msg = `🛒 *Pedido Vitorelli*\n\n${pedido}\n`;

  const endereco = document.getElementById('endereco').value;
  const bairro = document.getElementById('bairro').value;
  
  if (endereco && bairro) {
    let taxa = 0;
    const taxas = {
      'Centro': 3, 'Vila Nova': 3, 'JD. Bom Jesus': 3, 'Parque das Avencas': 3, 'Chácara Boa Vista': 3,
      'Morro Branco': 4, 'Paiol/KM 50': 7, 'Green Hills': 10, 'Trailer Club Gaivota': 10
    };
    taxa = taxas[bairro] || 0;
    msg += `📍 Endereço: ${endereco}\n🏘️ Bairro: ${bairro}\n🚚 Taxa: R$ ${taxa.toFixed(2)}\n`;
  } else if (document.getElementById('entregaCampos').style.display === 'block') {
    return alert('Preencha endereço e bairro para delivery.');
  }

  const pagamento = document.getElementById('pagamento').value;
  if (!pagamento) return alert('Selecione a forma de pagamento.');
  msg += `💳 Pagamento: ${pagamento}\n`;

  if (pagamento === 'Dinheiro') {
    const precisa = document.getElementById('precisaTroco').value;
    if (precisa === 'Sim') msg += `💵 Troco para: R$ ${document.getElementById('valorTroco').value}\n`;
    else msg += `💵 Não precisa de troco\n`;
  }

  const numero = '5511993407322';
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank');
}

function showCustomAlert(title, message) {
  document.getElementById('custom-alert-title').innerText = title;
  document.getElementById('custom-alert-message').innerText = message;
  document.getElementById('custom-alert-overlay').classList.add('show');
}

function hideCustomAlert() {
  document.getElementById('custom-alert-overlay').classList.remove('show');
                                          }
