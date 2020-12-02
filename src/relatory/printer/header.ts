import {centerText, horizontalLine} from './utils'
import {colors, paddings} from './styles'

export function printHeader(){
    let header = createHeader()

    console.log(colors.table(horizontalLine("all")));
    console.log(colors.table(header))
    console.log(colors.table(horizontalLine("all")));
}

function createHeader(){
    let timeText = 'HORA';
    let profitReceivedText = 'LUCRO';
    let winOrLossText = 'RESULTADO';
    let profitSoFarText = 'SALDO'
    align();
    let all = [        
        timeText,
        profitReceivedText,
        winOrLossText,
        profitSoFarText,
    ]
    colorize();



    return all.join('|')

    function align(){
        timeText = centerText(timeText,paddings.time)
        profitReceivedText = centerText(profitReceivedText,paddings.profitReceived)
        profitSoFarText = centerText(profitSoFarText,paddings.profitSoFar)
        winOrLossText = centerText(winOrLossText,paddings.winOrLoss)
    }

    function colorize(){
        all = all.map(a=>{
            return colors.positive(a);
        })
    }
}