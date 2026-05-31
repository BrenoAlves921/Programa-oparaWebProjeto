
export async function obterTodosOsPilotos() {
  try {
    console.log("A chamar API para pilotos...");
    const response = await fetch(
      "https://v1.formula-1.api-sports.io/rankings/drivers?season=2023",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "x-apisports-key": "eebd8d80a8b95331677bffa145b938cd"
        }
      }
    );
    console.log("Status da resposta:", response.status);
    const dados = await response.json();
    console.log("JSON recebido:", dados);
    return dados;
  } catch (err) {
    console.log("Erro na API:", err);
    return null;
  }
}


export async function procurarcorridas() {
  try {
    const response = await fetch(
      `https://v1.formula-1.api-sports.io/races?season=2023`, // envia um pedido á api com o nomepesquisado
      {
        method: "GET",
        mode: "cors",
        headers: {
          
        "x-apisports-key": "eebd8d80a8b95331677bffa145b938cd"
        }
      }
    );
    const dados = await response.json();  // espera pela resposta da api e converte para json
    console.log(dados);
    return dados;   
  } catch (err) {
    console.log(err);
  }
};

