import 
    {
        nextSignal,
        previous,
        countSignal,
        formatSignals,
        relatory,
        remaining,
        executed,
        last,
        config,
        usage,
    } 
from './index.js';

export const operations = {
    proximo: nextSignal,
    anterior: previous,
    total: countSignal,
    formatar: formatSignals,
    relatorio: relatory,
    restantes: remaining,
    executados: executed,
    ultimo: last,
    config: config,
    help: usage,
    "-h": usage,
    "--help": usage,
}
