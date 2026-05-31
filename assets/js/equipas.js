const container = document.getElementById("teams-container");

// Mapeamento de nomes de equipas da API para nomes dos arquivos
const teamMapping = {
  "alpine": "alpine",
  "aston martin": "astonmartin",
  "audi": "audi",
  "cadillac": "cadillac",
  "ferrari": "ferrari",
  "haas": "haasf1team",
  "kick sauber": "kicksauber",
  "mclaren": "mclaren",
  "mercedes": "mercedes",
  "racing bulls": "racingbulls",
  "red bull": "redbullracing",
  "williams": "williams"
};

async function carregarEquipas() {
  try {
    const res = await fetch("https://v1.formula-1.api-sports.io/teams", {
      method: "GET",
      headers: {
        "x-apisports-key": "eebd8d80a8b95331677bffa145b938cd"  
      }
    });

    const result = await res.json();
    const teams = result.response || [];

    container.innerHTML = "";

    teams.forEach(team => {
      const card = document.createElement("a");
      card.className = "team-card";

      // Procura a chave correta no mapeamento
      const teamNameLower = team.name.toLowerCase();
      let teamPage = null;
      
      for (const [key, value] of Object.entries(teamMapping)) {
        if (teamNameLower.includes(key)) {
          teamPage = value;
          break;
        }
      }

      // Se não encontrou no mapeamento, usa o padrão anterior
      if (!teamPage) {
        teamPage = team.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/[^a-z0-9]/g, "");
      }

      card.href = `../pages/equipasSubPages/${teamPage}.html`;

      card.innerHTML = `
        <img
          class="team-logo"
          src="${team.logo}"
          alt="${team.name}"
          onerror="this.src='../assets/Logos/default.png';"
        />
        <strong>${team.name}</strong>
        <button>Ver detalhes</button>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Erro ao carregar equipas:", err);
    container.innerHTML = "<p>Erro ao carregar equipas. Verifica a chave da API.</p>";
  }
}

carregarEquipas();