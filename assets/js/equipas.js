const container = document.getElementById("teams-container");

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

      const teamPage = team.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "");

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