import { TStatsResult } from "types";
import { windowInfo } from "./styles";
import { centerText } from "./utils";

export function printStats(stats: TStatsResult) {
    const statsText = `${`=`.repeat(windowInfo.width)}
        COMO A BANCA ESTAVA ANTES DA OPERAÇÃO: ${'R$ ' + stats.initialBalance}
        LUCRO TOTAL DESDE A PRIMEIRA OPERAÇÃO: ${'R$ ' + stats.totalProfit}
        LUCRO TOTAL EXIBIDO NA TELA: ${(1 < 0)
                ? 'R$ ' + stats.parcialProfit
                : 'R$ ' + stats.parcialProfit
            }

        TAKEPROFIT: ${stats.takeProfit}
        STOPLOSS: ${stats.stopLoss}

        QUANTIDADE DE ENTRADAS EXIBIDAS AGORA: ${stats.allResults}
        QUANTIDADE DE LOSS: ${stats.lossCount}
        QUANTIDADE DE WINS: ${stats.winsCount}
        QUANTIDADE DE EMPATES: ${stats.drawsCount}
    
        ASSERTIVIDADE: ${stats.accuracy}%
    `

    console.log(centerText(statsText, windowInfo.width));
}