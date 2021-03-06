import chalk from 'chalk';
import {getNextSignal, getLastSignal,getExecutedSignal,getRemainingSignal,getPreviousSignal} from '../signal-utilities/index.js'
import {getSignals} from '../signalsInfo/index.js';
import {convertAliasDate,saveConfig,checkDateFormat} from '../helpers/index.js';
import scriptConfig from '../scriptconfig.json';
import {relate} from '../relatory/index.js'
import * as error from '../error.js';
import {helpTexts} from './help/index.js';
import readline from 'readline';
import {format} from '../auto-trade-converter/index.js'


export async function nextSignal(){
    let signalsInfo = await getSignals()
    let nextSignal = getNextSignal(signalsInfo)
    console.log(`O próximo sinal será às ${chalk.cyan(nextSignal)}`);
}

export async function previous(){
    let signalsInfo = await getSignals()
    console.log(`O ÚLTIMO SINAL EXECUTADO FOI ÀS ${chalk.cyan(getPreviousSignal(signalsInfo))}`);
}

export async function countSignal(){
    let signalsInfo = await getSignals()
    console.log(`ATUALMENTE FORAM CATALOGADOS ${chalk.bold(signalsInfo.length)} SINAIS`); 
}

export async function formatSignals(){
    const signalsInfo = await getSignals()
    format(signalsInfo)
}
export async function relatory(){
    const subArgs = {
        date: process.argv[3]
    }
    if(!subArgs.date){
        error.noDateProvided();
        return;
    }
    if(!checkDateFormat(convertAliasDate(subArgs.date))){
        error.invalidDateFormat()
        return;
    }
    relate(convertAliasDate(subArgs.date));
}

export async function remaining(){
    let signalsInfo = await getSignals()
    console.log(`AINDA FALTAM ${chalk.cyan(getRemainingSignal(signalsInfo))} SINAIS PARA SEREM EXECUTADOS`)
}

export async function executed(){
    let signalsInfo = await getSignals()
    
    console.log(`${chalk.cyan(getExecutedSignal(signalsInfo))} SINAIS FORAM EXECUTADOS`)
}

export async function last(){
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
        
        Digite ${chalk.yellowBright('CTRL+C')} a qualquer momento para cancelar
    `)

    rl.question(
`        Digite o timeframe que você deseja configurar ${chalk.yellowBright('(formato 1, 5, 15...)')}
        `, (timeframe) => {
        if(timeframe!=""){
            scriptConfig.time_frame = timeframe.trim();
        }
        
        rl.question(`        
        Digite a data dos sinais ${chalk.yellowBright('(formato DD:MM:AAAA')}
        ${chalk.greenBright('DICA:')} você também pode digitar 'hoje' ou 'ontem' 
        ao invés de digitar a data completa 
        `,(date)=>{
            if(!checkDateFormat(convertAliasDate(date))){
                console.log(chalk.redBright(`
        Formato Incorreto de data
        `));
                rl.close();
                return;
            }
            scriptConfig.date = convertAliasDate(date);
            saveConfig(scriptConfig);
            rl.close();
        })
    });

}

export function usage(){
    const subArgs = {
        subcommand: process.argv[3]
    }

    if(!helpTexts[subArgs.subcommand] | !subArgs.subcommand){
        console.log(helpTexts.help);
        return;
    }

    console.log(helpTexts[subArgs.subcommand])
}


