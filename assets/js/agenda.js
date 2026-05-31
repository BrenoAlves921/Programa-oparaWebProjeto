import { procurarcorridas } from "./data/api.js";

// Pequeno dicionário para traduzir o status da API para as tuas classes CSS
const statusCores = { completed: 'finished', scheduled: 'upcoming' };

async function carregarAgenda() {
    const contentor = document.querySelector('.list-section');
    contentor.innerHTML = '<p style="padding: 20px;">A carregar o calendário de 2026...</p>';

    try {
        const dados = await procurarcorridas();
        const corridasAPI = dados?.response || [];

        const htmlCards = corridasAPI
        .filter(c => c.type === 'Race') // Filtra apenas as corridas principais
        .map((c, i) => {
                
                const { name = 'Nome Indisponível', location } = c.competition;
                const { name: circuitName, image: circuitImg } = c.circuit;
                const dataPT = new Date(c.date).toLocaleDateString('pt-PT');
                
                const statusClass = statusCores[c.status.toLowerCase()] || 'next';

                // 3. Retorna o HTML diretamente
                return `
                    <div class="race-row status-${statusClass}">
                        <div class="race-round">
                            <span class="round-num">${i + 1}</span>
                            <span class="round-label">Round</span>
                        </div>
                        <div class="race-info">
                            <strong class="titulo">${name}</strong>
                            <div class="flag-name">
                                <span class="country-location">${location.country}</span> | <span class="city">${location.city}</span>
                            </div>
                            <p class="circuit">${circuitName}</p>
                        </div>
                        <div class="race-meta-col">
                            <span class="meta-label">Data</span>
                            <span class="meta-val">${dataPT}</span>
                            <span class="meta-label" style="margin-top: 8px;">Voltas / Distância</span>
                            <span class="meta-val" style="font-size: 0.85rem;">${c.laps?.total || 'N/A'} voltas (${c.distance || 'N/A'})</span>
                        </div>
                        <div class="race-meta-col">
                            <span class="meta-label">Estado</span>
                            <span class="status-badge ${statusClass}">${c.status}</span>
                        </div>
                        <div class="circuit-img-wrap">
                            <img src="${circuitImg}" alt="Circuito" onerror="this.style.display='none'">
                        </div>
                    </div>
                `;
            }).join('');

        // Preenche o contentor, mas avisa se não houver corridas após o filtro
        contentor.innerHTML = htmlCards || '<p style="padding: 20px;">Nenhuma corrida agendada encontrada.</p>';

    } catch (erro) {
        console.error("Erro ao renderizar a agenda:", erro);
        contentor.innerHTML = '<p style="padding: 20px;">Ocorreu um erro ao carregar as corridas. Tenta novamente mais tarde.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarAgenda);