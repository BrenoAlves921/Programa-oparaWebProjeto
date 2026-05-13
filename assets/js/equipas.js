console.log("script ativo") // log para verirficar se o cript foi ou nao ativo

const body = document.body; // vai buscar o body do html
import { procurarcorridas } from "./data/api.js"; // vai com o import buscar  a função procurar corridas do "./data/api.js"

async function procurarEquipa (){             // async funcion para "gerar a agenda"
    const dados = await procurarEquipa().  // declara uma constar para os dados provenientes do tal import
    console.log(dados)                          // log para imprimir os dados (estagio inicial do codigo)
};

procurarEquipa();                                   // log para imprimir os dados (estagio inicial do codigo)
