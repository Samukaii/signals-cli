import * as help from './texts';

export const helpTexts: { [key: string]: string } = {
    help: help.generalUsage,
    proximo: help.next,
    anterior: help.prev,
    total: help.total,
    formatar: help.format,
    relatorio: help.relatory,
    restantes: help.remaining,
    executados: help.executed,
    ultimo: help.last,
    config: help.config
}

interface IhelpTexts {
    help: string,
    proximo: string,
    anterior: string,
    total: string,
    formatar: string,
    relatorio: string,
    restantes: string,
    executados: string,
    ultimo: string,
    config: string
}