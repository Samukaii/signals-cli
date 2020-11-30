import chalk from "chalk"

export const generalUsage: string = `
    ${chalk.bold(`CLI criada para auxiliar na formatação e acompanhamento de listas de sinais
    Uso: sinais COMANDO [SUBCOMANDO]`)}


    ${chalk.bold(`Lista com todos os comandos:`)}

    ${chalk.cyan("proximo")}: Utilize para saber qual seria o próximo sinal da lista a partir da hora atual

    ${chalk.greenBright("anterior")}: Utilize para saber qual seria o sinal anterior da lista a partir da hora atual

    ${chalk.blueBright("total")}: Indica quantos sinais no total estão catalogados na lista

    ${chalk.magentaBright("formatar")}: Formata os sinais no formato sabintrader para autotrader

    ${chalk.redBright("relatorio")}: Exibe um relatório informando os resultados das operações realizadas até o momento atual

    ${chalk.yellowBright("restantes")}: Imprime o número de sinais catalogados na lista que ainda podem ser executados

    ${chalk.blueBright("executados")}: Imprime o número de sinais catalogados na lista que já passaram e não serão mais executados

    ${chalk.cyanBright("ultimo")}: Imprime o último sinal catalogado para o dia

    ${chalk.yellowBright("config")}: Utilize para preencher configurações que serão utilizadas na CLI

    ${chalk.bold(`Digite 'sinais help COMANDO' para saber informações detahadas sobre cada comando
        COMANDO é o nome do comando que você quer saber`)}
`

export const next: string = `
    Utilize para saber qual seria o próximo sinal da lista a partir da hora atual
`;
export const prev: string = `
    Utilize para saber qual seria o sinal anterior da lista a partir da hora atual
`;
export const total: string = `
    Indica quantos sinais no total estão catalogados na lista
`;
export const format: string = `
    Formata os sinais no formato sabintrader para autotrader

    Este comando utiliza o texto gerado pelo efraim.exe e converte
    o formato dos sinais para um formato compreensível para o autotrade.exe

    ${chalk.redBright("IMPORTANTE:")} Para que esta CLI encontre o arquivo de sinais do efraim
    ela precisa do timeframe utilizado na geração do sinal e também da data de geração
    Esta configuração fica no arquivo scriptconfig.json na pasta da CLI, mas para configurar
    facilmente apenas digite 'sinais config'

    caso o timeframe e a data já estejam configurados corretamente não se preocupe com isso
`;
export const relatory: string = `
    Exibe um relatório informando os resultados das operações realizadas até o momento atual
    USO: sinais relatorio DATA
    DATA é a data da catalogação no formato DD:MM:AAAA

    ${chalk.greenBright('DICA:')} você também pode utilizar o comando 'sinais relatorio hoje'
    ou 'sinais relatorio ontem' ao invés de digitar a data completa 

    ${chalk.cyanBright(`FILTROS:`)}
    USO: sinais relatorio DATA FILTRO1 FILTRO2 ETC
    Você pode usar algumas opções como argumentos para filtrar detalhes do relatório.

    ${chalk.magentaBright('--mostrar-apenas')} : Exibe apenas as entradas em que uma das opções ocorreram
    As opções disponíveis são: wins e loss

        ${chalk.greenBright(`ex: sinais relatorio hoje --mostrar-apenas=wins
        ou na versão curta:

        sinais relatorio hoje -m wins
        `)}

    ${chalk.blueBright('--gales')} : Exibe apenas as entradas em que o gale especificado foi executado

        ${chalk.greenBright(`ex: sinais relatorio hoje --gales=2`)}

        ${chalk.cyanBright(`ou na versão curta:`)}

        ${chalk.greenBright(`sinais relatorio hoje -g 2`)}

    ${chalk.greenBright("DICA:")} filtros também podem ser combinados

        ${chalk.greenBright(`ex: sinais relatorio hoje --gales=0 --mostrar-apenas=wins`)}

        ${chalk.cyanBright(`ou na versão curta:`)}

        ${chalk.greenBright(`sinais relatorio hoje -g 0 -m wins`)}

    Este comando procura na pasta de logs do autotrade.exe informações relevantes sobre o 
    histórico de execuções do robô e exibe na tela

    ${chalk.redBright("IMPORTANTE:")} Para que esta CLI encontre o histórico de execuções você 
    precisa informar a data correta.
`;
export const remaining: string = `
    Imprime o número de sinais catalogados na lista que ainda podem ser executados
`;
export const executed: string = `
    Imprime o número de sinais catalogados na lista que já passaram e não serão mais executados
`;
export const last: string = `
    Imprime o último sinal catalogado para o dia
`;
export const config: string = `
    Utilize para preencher configurações que serão utilizadas na CLI

    ${chalk.cyanBright(`Para mais informaçõe digite 'sinais help formatar'`)}
`;