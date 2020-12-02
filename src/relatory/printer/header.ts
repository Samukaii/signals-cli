import {centerText} from './utils'
import {resultStyle,windowInfo} from './styles'

export function printHeader(){
    const timeText = `${centerText('HORA',resultStyle.time.padding)}`;
    const profitReceivedText = `${centerText('LUCRO',resultStyle.profitReceived.padding)}`;
    const winOrLossText = `${centerText('RESULTADO',resultStyle.winOrLoss.padding)}`;
    const profitSoFarText = `${centerText('SALDO',resultStyle.profitSoFar.padding)}`;
    console.log(`${timeText}| ${profitReceivedText} | ${winOrLossText} | ${profitSoFarText}`);
    console.log('='.repeat(windowInfo.width));
}