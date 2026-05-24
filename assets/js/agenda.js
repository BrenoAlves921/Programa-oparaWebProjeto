// 1. Verificação inicial: Exibe uma mensagem na consola do navegador para garantir que o ficheiro JS foi carregado corretamente no HTML.
console.log("script ativo");

// 2. Importação modular: Importa a função assíncrona 'procurarcorridas' a partir do ficheiro api.js.
// O uso de 'import' exige que o script seja declarado com type="module" no HTML.
import { procurarcorridas } from "./data/api.js";


async function carregarAgenda() {
    // 3. Seleção do DOM: Procura o elemento HTML com a classe '.list-section' onde os cards vão ser inseridos.
    const contentor = document.querySelector('.list-section');
    
    // 4. Feedback visual (UX): Define um texto temporário de carregamento para o utilizador sabendo que os dados estão a ser procurados.
    contentor.innerHTML = '<p>A carregar o calendário de 2026...</p>';

    try {
        // 5. Pedido Assíncrono: Aguarda (await) que a função da API termine e guarda a resposta (JSON completo) na variável 'dados'.
        const dados = await procurarcorridas();
        
        // 6. Extração de dados: Isola o array de corridas retornado pela API-Sports, que normalmente fica dentro da propriedade '.response'.
        const corridasAPI = dados.response; 

        // 7. Processamento e Criação de HTML: O método .map() percorre cada objeto do array 'corridasAPI'.
        const htmlCards = corridasAPI.map(corridaApi => {
            
            // 7.1. Normalização dos dados: Cria um novo objeto mais limpo e seguro, tratando possíveis valores nulos ou ausentes.
            const corrida = {
                // Se o nome não existir, assume 'Nome Indisponível' por segurança (Fallback)
                name: corridaApi.competition.name || 'Nome Indisponível',
                country: corridaApi.competition.location.country,
                city: corridaApi.competition.location.city,
                circuit: corridaApi.circuit.name,
                image: corridaApi.circuit.image,
                distance: corridaApi.distance || 'N/A',
                laps: corridaApi.laps.total || 'N/A',
                // Conversão de Data: Converte a string de data da API para um objeto Date e formata-a para o padrão português (DD/MM/AAAA).
                date: new Date(corridaApi.date).toLocaleDateString('pt-PT'),
                status: corridaApi.status
            };

            // 7.2. Template Literal: Retorna uma string contendo a estrutura HTML preenchida dinamicamente com as variáveis da corrida atual.
            return `
                <div class="race-row">
                    <div class="race-info">
                        <strong class="titulo">${corrida.name}</strong>
                        <p class="country-location">${corrida.country}</p>
                        <p class="city">${corrida.city}</p>
                        <p class="circuit">${corrida.circuit}</p>
                        <img src="${corrida.image}" alt="Circuito de ${corrida.city}">
                    </div>
                    <div class="caracteristicas">
                        <p class="distance">${corrida.distance}</p>
                        <p class="laps">${corrida.laps} voltas</p>
                        <p class="date">${corrida.date}</p>
                        <p class="status">${corrida.status}</p>
                    </div>
                </div>
            `;
        })

        // 8. Atualização do DOM: Substitui o texto de carregamento e insere todos os cards de uma só vez na página, maximizando a performance.
        contentor.innerHTML = htmlCards;

    } catch (erro) {
        console.error("Erro ao renderizar a agenda:", erro);
        contentor.innerHTML = '<p>Ocorreu um erro ao carregar as corridas. Tenta novamente mais tarde.</p>';
    }
}


document.addEventListener('DOMContentLoaded', carregarAgenda);