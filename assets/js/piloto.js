import { obterTodosOsPilotos } from "./data/api.js";

export async function carregarPilotos() {
  const contentor = document.querySelector('.list-section');
  if (!contentor) return console.error("Elemento .list-section não encontrado!");

  contentor.innerHTML = '<p>A carregar o plantel de 2023...</p>';

  try {
    const dados = await obterTodosOsPilotos();
    const rankings = dados?.response || (Array.isArray(dados) ? dados : []);

    if (rankings.length === 0) {
      contentor.innerHTML = '<p>Nenhum piloto encontrado. Tenta dar refresh à página.</p>';
      return;
    }

    contentor.innerHTML = rankings.map(({ driver = {}, team = {}, points = 0, position = "-" }) => `
      <div
        class="pilot-card"
        role="button"
        tabindex="0"
        style="cursor:pointer"
        data-driver-id="${driver.id || ''}"
        data-season="2023"
        title="Ver detalhes de ${driver.name || 'piloto'}"
      >
        <div class="pilot-image">
          <img
            src="${driver.image || '/assets/Logos/pilots.png'}"
            alt="${driver.name || 'Desconhecido'}"
            onerror="this.src='/assets/Logos/pilots.png'"
          >
        </div>
        <div class="pilot-info">
          <strong class="pilot-name">${driver.name || 'Desconhecido'}</strong>
          <p class="pilot-number">#${driver.number || '-'}</p>
          <p class="pilot-team">${team.name || 'Sem equipa'}</p>
          <p class="pilot-points">${points} pts</p>
        </div>
      </div>
    `).join('');

    // Tornar cada card clicável — navega para a página de detalhe
    contentor.querySelectorAll('.pilot-card').forEach(card => {
      const navegar = () => {
        const id     = card.dataset.driverId;
        const season = card.dataset.season;
        if (id) {
          window.location.href = `piloto-detalhe.html?id=${id}&season=${season}`;
        }
      };

      card.addEventListener('click', navegar);

      // Acessibilidade: Enter e Espaço também navegam
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navegar();
        }
      });
    });

  } catch (erro) {
    console.error("Erro ao carregar os pilotos:", erro);
    contentor.innerHTML = '<p>Ocorreu um erro ao carregar os pilotos. Tenta novamente mais tarde.</p>';
  }
}

document.addEventListener('DOMContentLoaded', carregarPilotos);