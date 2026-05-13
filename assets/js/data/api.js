const apikey = "140535bf2db1a720726c59b81e9ca249";

async function procurarDrivers(nomedriver) {
  try {
    const response = await fetch(
      "https://v1.formula-1.api-sports.io/${encodeURIComponent(nomedriver)}", // envia um pedido á api com o nomepesquisado
      {
        method: "GET",
        headers: {
        "x-apisports-key": apikey
        }
      }
    );
    const dados = await response.json();  // espera pela resposta da api e converte para json
    console.log(dados);
  } catch (err) {
    console.log(err);
  }
};


async function procurarEquipa(nomeequipa) {
  try {
    const response = await fetch(
      "https://v1.formula-1.api-sports.io/${encodeURIComponent(nomeequipa)}", // envia um pedido á api com o nomepesquisado
      {
        method: "GET",
        headers: {
        "x-apisports-key": apikey
        }
      }
    );
    const dados = await response.json();  // espera pela resposta da api e converte para json
    console.log(dados);
  } catch (err) {
    console.log(err);
  }
};



export async function procurarcorridas() {
  try {
    const response = await fetch(
      "https://v1.formula-1.api-sports.io/races?season=2026", // envia um pedido á api com o nomepesquisado
      {
        method: "GET",
        headers: {
          
        "x-apisports-key": apikey
        }
      }
    );
    const dados = await response.json();  // espera pela resposta da api e converte para json
    console.log(dados);
  } catch (err) {
    console.log(err);
  }
};

