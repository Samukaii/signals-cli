import chalk from 'chalk';
import { getNextSignal, getLastSignal, getExecutedSignal, getRemainingSignal, getPreviousSignal } from '../signal-utilities'
import { getSignals } from '../signalsInfo';
import { convertAliasDate, saveConfig, checkDateFormat } from '../helpers';
import scriptConfig from '../config/scriptconfig.json';
import { relate } from '../relatory'
import * as error from '../error';
import { helpTexts } from './help';
import readline from 'readline';
import { format } from '../coverter/auto-trade'
import { isNumber } from '../helpers';


export async function nextSignal(): Promise<void> {
    let signalsInfo = await getSignals()
    let nextSignal = getNextSignal(signalsInfo)
    console.log(`O próximo sinal será às ${chalk.cyan(nextSignal)}`);
}

export async function previous(): Promise<void> {
    let signalsInfo = await getSignals()
    console.log(`O ÚLTIMO SINAL EXECUTADO FOI ÀS ${chalk.cyan(getPreviousSignal(signalsInfo))}`);
}

export async function countSignal(): Promise<void> {
    let signalsInfo = await getSignals()
    if(!signalsInfo)return
    console.log(`ATUALMENTE FORAM CATALOGADOS ${chalk.bold(signalsInfo.length)} SINAIS`);
}

export async function formatSignals(): Promise<void> {
    const signalsInfo = await getSignals()
    format(signalsInfo)
}
export async function relatory(): Promise<void> {
    const subArgs = {
        date: process.argv[3]
    }
    if (!subArgs.date) {
        error.noDateProvided();
        return;
    }
    if (!checkDateFormat(convertAliasDate(subArgs.date))) {
        console.log(convertAliasDate(subArgs.date))
        error.invalidDateFormat()
        return;
    }
    relate(convertAliasDate(subArgs.date));
}

export async function remaining(): Promise<void> {
    let signalsInfo = await getSignals()
    console.log(`AINDA FALTAM ${chalk.cyan(getRemainingSignal(signalsInfo))} SINAIS PARA SEREM EXECUTADOS`)
}

export async function executed(): Promise<void> {
    let signalsInfo = await getSignals()

    console.log(`${chalk.cyan(getExecutedSignal(signalsInfo))} SINAIS FORAM EXECUTADOS`)
}

export async function last(): Promise<void> {
    let signalsInfo = await getSignals()
    console.log(`ÀS ${chalk.cyan(getLastSignal(signalsInfo))} SERÁ EXECUTADO O ÚLTIMO SINAL DE HOJE`);
}

export function config(){
    let rl = readline.createInterface(process.stdin, process.stdout)
    console.log(`
                                ${chalk.bold('CONFIGURAÇÔES')}
        Este é o centro de configurações da CLI e atualmente essas são as configurações
        ${chalk.greenBright('Time Frame')}: ${scriptConfig.time_frame}
        ${chalk.greenBright('Data')}: ${scriptConfig.date}
        ${chalk.greenBright('Entrada Inicial')}: ${scriptConfig.initial_entry}
        ${chalk.greenBright('Fator do Gale')}: ${scriptConfig.gale_factor}
        
        Digite ${chalk.yellowBright('CTRL+C')} a qualquer momento para cancelar

        Caso queira pular uma pergunta apenas tecle ${chalk.yellowBright('ENTER')}
    `)
    questTimeFrame();
    function questTimeFrame(){
    rl.question(`        
        Digite o timeframe que você deseja configurar ${chalk.yellowBright('(formato 1, 5, 15...)')}
        `, (timeframe) => {
            if(timeframe!=""){
                if(isNumber(timeframe))
                scriptConfig.time_frame = parseFloat(timeframe.trim());
            }
           questDate(); 
        });
    }
    function questDate(){
        rl.question(`        
        Digite a data dos sinais ${chalk.yellowBright('(formato DD:MM:AAAA')}
        ${chalk.greenBright('DICA:')} você também pode digitar 'hoje' ou 'ontem' 
        ao invés de digitar a data completa 
        `,(date)=>{
            if(date){
            if(checkDateFormat(convertAliasDate(date))){
                scriptConfig.date = convertAliasDate(date);
            }else{
                console.log(chalk.redBright(`
        ✘ Formato Incorreto de data
                `));
                questDate();
            }
            }
            questInitialEntry();
        })
    }
    function questInitialEntry(){
        rl.question(`        
        Digite o valor de entrada inicial dos sinais ${chalk.yellowBright('(formato 3, 5, 10...)')}
        `,(initialEntry)=>{
            if(initialEntry){
                if(isNumber(initialEntry))
                scriptConfig.initial_entry = parseFloat(initialEntry);
                else {
                    console.log(chalk.redBright(`
        ✘ Formato Incorreto de entrada
                `));
                questInitialEntry();
                }
            }
            questGaleFactor();
        })
    }
    function questGaleFactor(){
        rl.question(`        
        Digite o fator dos gales ${chalk.yellowBright('(formato 2.3, 2.5, 3...)')}
        ${chalk.redBright.bold("ATENÇÃO:")} Utilize o ponto quando o número for decimal
        e não a vírgula

        ${chalk.redBright.bold("✘ Errado: 2,3")}
        ${chalk.greenBright("✓ Certo: 2.3")}

        `,(galeFactor)=>{
            if(galeFactor){
                if(isNumber(galeFactor))
                scriptConfig.gale_factor = parseFloat(galeFactor);
                else {
                    console.log(chalk.redBright(`
        ✘ Formato Incorreto de fator
                `));   
                    questGaleFactor();
                }
            }
            saveConfig(scriptConfig);
            rl.close();
        })
    }

}


export function usage(): void {
    const subArgs: { [key: string]: string } = {
        subcommand: process.argv[3]
    }

    if (!helpTexts[subArgs.subcommand] || !subArgs.subcommand) {
        console.log(helpTexts.help);
        return;
    }

    console.log(helpTexts[subArgs.subcommand])
}


