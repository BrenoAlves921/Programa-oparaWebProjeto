import { obterTodosOsPilotos } from "./data/api.js";

const coresEquipas = {
  "ferrari": "#e10600", "scuderia ferrari": "#e10600",
  "red bull": "#367fa9", "red bull racing": "#367fa9",
  "mercedes": "#27f4d2", "mclaren": "#ff8700",
  "aston martin": "#229971", "alpine": "#0093cc",
  "williams": "#37bedd", "haas": "#b6babd",
  "sauber": "#52e252", "rb": "#6692ff"
};

export async function carregarPilotos() {
  const contentor = document.querySelector('.list-section');
  if (!contentor) return;

  try {
    const dados = await obterTodosOsPilotos();
    const rankings = dados?.response || [];

    contentor.className = "pilots-grid"; 
    
    contentor.innerHTML = rankings.map(({ driver, team, points, position }) => {
      const cor = coresEquipas[team.name.toLowerCase()] || '#888';
      const [primeiro, ...resto] = driver.name.split(' ');
      
      return `
        <div class="pilot-card" style="--team-color: ${cor}">
          <div class="pilot-number-bg">${driver.number || ''}</div>
          <div class="pilot-img-wrap">
            <img src="${driver.image}" alt="${driver.name}" onerror="this.src='/assets/Logos/pilots.png'">
          </div>
          <div class="pilot-info">
            <span class="pilot-team">${team.name}</span>
            <strong class="pilot-name">
              <span class="fname">${primeiro}</span> ${resto.join(' ').toUpperCase()}
            </strong>
            <p>${points} PTS</p>
          </div>
          <div class="pilot-card-footer">
            <span>Lugar nº ${position}</span>
          </div>
        </div>
      `;
    }).join('');

  } catch (erro) {
    console.error("Erro ao carregar pilotos:", erro);
    contentor.innerHTML = '<p style="padding: 20px;">Erro ao carregar dados dos pilotos.</p>';
  }
}

document.addEventListener('DOMContentLoaded', carregarPilotos);