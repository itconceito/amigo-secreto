document.addEventListener('DOMContentLoaded', () => {
  let amigos = [];

  function adicionarAmigo() {
      const input = document.getElementById('amigo');
      const nome = input.value.trim();

      if (nome && !amigos.includes(nome)) {
          amigos.push(nome);
          atualizarListaAmigos();
          input.value = '';
          input.focus();
      } else {
          alert('Nome inválido ou já existente!');
      }
  }

  function atualizarListaAmigos() {
      const lista = document.getElementById('listaAmigos');
      lista.innerHTML = '';

      amigos.forEach(nome => {
          const li = document.createElement('li');
          li.textContent = nome;
          lista.appendChild(li);
      });
  }

  function sortearAmigo() {
      if (amigos.length < 2) {
          alert('É necessário pelo menos 2 amigos para o sorteio.');
          return;
      }

      let sorteio = {};
      let disponiveis = [...amigos];

      for (const pessoa of amigos) {
          let possiveis = disponiveis.filter(a => a !== pessoa);

          if (possiveis.length === 0) {
              alert('Não foi possível gerar um sorteio válido. Tente novamente.');
              return;
          }

          const escolhido = possiveis[Math.floor(Math.random() * possiveis.length)];
          sorteio[pessoa] = escolhido;
          disponiveis = disponiveis.filter(a => a !== escolhido);
      }

      mostrarResultado(sorteio);
  }

  function mostrarResultado(sorteio) {
      const resultado = document.getElementById('resultado');
      resultado.innerHTML = '';

      for (const [pessoa, amigo] of Object.entries(sorteio)) {
          const li = document.createElement('li');
          li.textContent = `${pessoa} → ${amigo}`;
          resultado.appendChild(li);
      }
  }

  // Adiciona listener para tecla Enter no input
  const input = document.getElementById('amigo');
  input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          adicionarAmigo();
      }
  });

  // Torna as funções acessíveis globalmente para os botões onclick
  window.adicionarAmigo = adicionarAmigo;
  window.sortearAmigo = sortearAmigo;

  // Efeito fade para imagem que some e aparece a cada 5 segundos
  const img = document.querySelector('.header-banner img');
  let visivel = true;

  setInterval(() => {
    if (visivel) {
      img.style.opacity = '0';
    } else {
      img.style.opacity = '1';
    }
    visivel = !visivel;
  }, 3000);
});
