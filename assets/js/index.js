const corridasData = [
      {
        name: "Saudi Arabian Grand Prix",
        date: "2026-06-07",
        city: "Jeddah",
        country: "Saudi Arabia",
        circuit: "Jeddah Corniche Circuit",
        coords: { lat: 24.7136, lng: 46.6753 }
      },
      {
        name: "Monaco Grand Prix",
        date: "2026-06-14",
        city: "Monte Carlo",
        country: "Monaco",
        circuit: "Circuit de Monaco",
        coords: { lat: 43.7384, lng: 7.4246 }
      },
      {
        name: "Spanish Grand Prix",
        date: "2026-06-21",
        city: "Barcelona",
        country: "Spain",
        circuit: "Circuit de Barcelona-Catalunya",
        coords: { lat: 41.57, lng: 1.586 }
      },
      {
        name: "Austrian Grand Prix",
        date: "2026-06-28",
        city: "Spielberg",
        country: "Austria",
        circuit: "Red Bull Ring",
        coords: { lat: 47.2127, lng: 14.7633 }
      }
    ];

    function carregarProximaCorrida() {
      try {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        // Encontra a próxima corrida
        const proximaCorrida = corridasData.find(corrida => {
          const dataCorrida = new Date(corrida.date);
          dataCorrida.setHours(0, 0, 0, 0);
          return dataCorrida >= hoje;
        });
        
        if (proximaCorrida) {
          const data = new Date(proximaCorrida.date);
          const dataFormatada = data.toLocaleDateString('pt-PT', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          
          // Criar URL do mapa
          const { lat, lng } = proximaCorrida.coords;
          const mapUrl = `https://maps.openstreetmap.org/export/png.php?bbox=${lng-0.05},${lat-0.05},${lng+0.05},${lat+0.05}&w=300&h=150`;
          
          // Atualizar mapa
          const mapContainer = document.getElementById('race-map');
          mapContainer.innerHTML = `<img src="${mapUrl}" alt="Mapa de ${proximaCorrida.circuit}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`;
          
          // Atualizar informações
          const infoContainer = document.getElementById('race-info');
          infoContainer.innerHTML = `
            <h4>${proximaCorrida.name}</h4>
            <p><strong>${dataFormatada}</strong></p>
            <p>${proximaCorrida.city}, ${proximaCorrida.country}</p>
            <a href="pages/agenda.html" class="btn small">Ver agenda completa</a>
          `;
        }
      } catch (err) {
        console.error("Erro ao carregar próxima corrida:", err);
      }
    }

    carregarProximaCorrida();

    // ============================================
    // 1. Lógica das Equipas
    // ============================================
    const container = document.getElementById("teams-grid");
    const equipas = [
      { nome: "Red Bull Racing", file: "redbullracing.html" },
      { nome: "Mercedes", file: "mercedes.html" },
      { nome: "Ferrari", file: "ferrari.html" },
      { nome: "McLaren", file: "mclaren.html" }
    ];
    
    equipas.forEach(equipa => {
      const logoName = equipa.file.replace('.html', '').replace('racing', '');
      const card = document.createElement("a");
      card.href = `pages/equipasSubPages/${equipa.file}`;
      card.className = "mini-card";
      card.innerHTML = `<img src="assets/Logos/${logoName}.png" alt="${equipa.nome}" class="tiny-logo" onerror="this.src='assets/Logos/default.png'">
                        <strong>${equipa.nome}</strong><span>Ver equipa</span>`;
      container.appendChild(card);
    });

    // ============================================
    // 2. Lógica do Piloto Destaque (Automático)
    // ============================================
    async function carregarLider() {
      try {
        const res = await fetch("https://api.openf1.org/v1/standings?session_key=9158");
        const standings = await res.json();
        standings.sort((a, b) => b.points - a.points);
        const lider = standings[0];

        const resDriver = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${lider.driver_number}`);
        const driverData = await resDriver.json();
        const p = driverData[0];

        // Atualiza o cartão de piloto em destaque
        const container = document.getElementById("dynamic-pilot-info");
        container.querySelector("h4").innerText = p.full_name;
        container.querySelector(".stats-box").innerHTML = `<div><strong>${lider.points}</strong><span>Pontos</span></div>`;
        if (p.headshot_url) {
          const img = container.querySelector(".driver-img");
          img.src = p.headshot_url;
          img.alt = p.full_name;
        }

        // Atualiza a tabela de últimos resultados com os 3 primeiros da classificação
        const latestBody = document.getElementById('latest-results-body');
        const top3 = standings.slice(0, 3);
        latestBody.innerHTML = top3.map((item, idx) => {
          const driverName = item.driver?.full_name || item.driver?.name || 'Desconhecido';
          const teamName = item.team?.name || item.team?.short_name || '—';
          return `<tr><td>${idx + 1}</td><td>${driverName}</td><td>${teamName}</td><td>${item.points}</td></tr>`;
        }).join('');
      } catch (e) {
        console.log("API indisponível, usando destaque fixo.");
        const latestBody = document.getElementById('latest-results-body');
        latestBody.innerHTML = `
          <tr><td>1</td><td>M. Verstappen</td><td>Red Bull</td><td>25</td></tr>
          <tr><td>2</td><td>L. Hamilton</td><td>Mercedes</td><td>18</td></tr>
          <tr><td>3</td><td>C. Leclerc</td><td>Ferrari</td><td>15</td></tr>
        `;
      }
    }

    carregarLider();