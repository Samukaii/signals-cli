"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.last = exports.executed = exports.remaining = exports.relatory = exports.format = exports.total = exports.prev = exports.next = exports.generalUsage = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.generalUsage = `
    ${chalk_1.default.bold(`CLI criada para auxiliar na formatação e acompanhamento de listas de sinais
    Uso: sinais COMANDO [SUBCOMANDO]`)}


    ${chalk_1.default.bold(`Lista com todos os comandos:`)}

    ${chalk_1.default.cyan("proximo")}: Utilize para saber qual seria o próximo sinal da lista a partir da hora atual

    ${chalk_1.default.greenBright("anterior")}: Utilize para saber qual seria o sinal anterior da lista a partir da hora atual

    ${chalk_1.default.blueBright("total")}: Indica quantos sinais no total estão catalogados na lista

    ${chalk_1.default.magentaBright("formatar")}: Formata os sinais no formato sabintrader para autotrader

    ${chalk_1.default.redBright("relatorio")}: Exibe um relatório informando os resultados das operações realizadas até o momento atual

    ${chalk_1.default.yellowBright("restantes")}: Imprime o número de sinais catalogados na lista que ainda podem ser executados

    ${chalk_1.default.blueBright("executados")}: Imprime o número de sinais catalogados na lista que já passaram e não serão mais executados

    ${chalk_1.default.cyanBright("ultimo")}: Imprime o último sinal catalogado para o dia

    ${chalk_1.default.yellowBright("config")}: Utilize para preencher configurações que serão utilizadas na CLI

    ${chalk_1.default.bold(`Digite 'sinais help COMANDO' para saber informações detahadas sobre cada comando
        COMANDO é o nome do comando que você quer saber`)}
`;
exports.next = `
    Utilize para saber qual seria o próximo sinal da lista a partir da hora atual
`;
exports.prev = `
    Utilize para saber qual seria o sinal anterior da lista a partir da hora atual
`;
exports.total = `
    Indica quantos sinais no total estão catalogados na lista
`;
exports.format = `
    Formata os sinais no formato sabintrader para autotrader

    Este comando utiliza o texto gerado pelo efraim.exe e converte
    o formato dos sinais para um formato compreensível para o autotrade.exe

    ${chalk_1.default.redBright("IMPORTANTE:")} Para que esta CLI encontre o arquivo de sinais do efraim
    ela precisa do timeframe utilizado na geração do sinal e também da data de geração
    Esta configuração fica no arquivo scriptconfig.json na pasta da CLI, mas para configurar
    facilmente apenas digite 'sinais config'

    caso o timeframe e a data já estejam configurados corretamente não se preocupe com isso
`;
exports.relatory = `
    Exibe um relatório informando os resultados das operações realizadas até o momento atual
    USO: sinais relatorio DATA
    DATA é a data da catalogação no formato DD:MM:AAAA

    ${chalk_1.default.greenBright('DICA:')} você também pode utilizar o comando 'sinais relatorio hoje'
    ou 'sinais relatorio ontem' ao invés de digitar a data completa 

    ${chalk_1.default.cyanBright(`FILTROS:`)}
    USO: sinais relatorio DATA FILTRO1 FILTRO2 ETC
    Você pode usar algumas opções como argumentos para filtrar detalhes do relatório.

    ${chalk_1.default.magentaBright('--mostrar-apenas')} : Exibe apenas as entradas em que uma das opções ocorreram
    As opções disponíveis são: wins e loss

        ${chalk_1.default.greenBright(`ex: sinais relatorio hoje --mostrar-apenas=wins
        ou na versão curta:

        sinais relatorio hoje -m wins
        `)}

    ${chalk_1.default.blueBright('--gales')} : Exibe apenas as entradas em que o gale especificado foi executado

        ${chalk_1.default.greenBright(`ex: sinais relatorio hoje --gales=2`)}

        ${chalk_1.default.cyanBright(`ou na versão curta:`)}

        ${chalk_1.default.greenBright(`sinais relatorio hoje -g 2`)}

    ${chalk_1.default.greenBright("DICA:")} filtros também podem ser combinados

        ${chalk_1.default.greenBright(`ex: sinais relatorio hoje --gales=0 --mostrar-apenas=wins`)}

        ${chalk_1.default.cyanBright(`ou na versão curta:`)}

        ${chalk_1.default.greenBright(`sinais relatorio hoje -g 0 -m wins`)}

    Este comando procura na pasta de logs do autotrade.exe informações relevantes sobre o 
    histórico de execuções do robô e exibe na tela

    ${chalk_1.default.redBright("IMPORTANTE:")} Para que esta CLI encontre o histórico de execuções você 
    precisa informar a data correta.
`;
exports.remaining = `
    Imprime o número de sinais catalogados na lista que ainda podem ser executados
`;
exports.executed = `
    Imprime o número de sinais catalogados na lista que já passaram e não serão mais executados
`;
exports.last = `
    Imprime o último sinal catalogado para o dia
`;
exports.config = `
    Utilize para preencher configurações que serão utilizadas na CLI

    ${chalk_1.default.cyanBright(`Para mais informaçõe digite 'sinais help formatar'`)}
`;
