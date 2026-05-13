console.log("script ativo") // log para verirficar se o cript foi ou nao ativo

const body = document.body; // vai buscar o body do html
import { procurarDrivers } from "./data/api.js"; // vai com o import buscar  a função procurar corridas do "./data/api.js"

async function procurarDrivers (){             // async funcion para "gerar a agenda"
    const dados = await procurarDrivers().  // declara uma constar para os dados provenientes do tal import
    console.log(dados)                          // log para imprimir os dados (estagio inicial do codigo)
};

procurarDrivers();                                   // log para imprimir os dados (estagio inicial do codigo)
