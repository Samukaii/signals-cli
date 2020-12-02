"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incorrectUsage = exports.invalidDateFormat = exports.noDateProvided = exports.noSignalsFile = exports.noLogFile = void 0;
const chalk_1 = __importDefault(require("chalk"));
function noLogFile(date) {
    console.log(`
        Não existe nenhum histórico para o dia ${date}.
        Certifique-se de que você está informando a data correta.
    `);
}
exports.noLogFile = noLogFile;
function noSignalsFile(date, timeframe) {
    console.log(`
        A CLI não encontrou nenhum arquivo de sinais para a data ${date}
        e o timeframe ${timeframe}.
        Certifique-se de que você está com as informações corretas e se o efraim 
        gerou os sinais

        ${chalk_1.default.yellowBright('AVISO:')} Talvez você não tenha informado corretamente as 
        configurações da CLI

        Para configurá-la digite 'sinais config'
    `);
}
exports.noSignalsFile = noSignalsFile;
function noDateProvided() {
    console.log(`
        Você esqueceu de informar a data!

        O formato é 'DD:MM:AAAA'

        Dica: você pode digitar 'hoje' ou 'ontem'
        ao invés da data completa.
    `);
}
exports.noDateProvided = noDateProvided;
function invalidDateFormat() {
    console.log(`
        A data informada não está no formato correto

        O formato é 'DD:MM:AAAA'

        Dica: você pode digitar 'hoje' ou 'ontem'
        ao invés da data completa.
    `);
}
exports.invalidDateFormat = invalidDateFormat;
function incorrectUsage() {
    console.log(`
        Você não digitou nenhum comando válido!
        digite "sinais help" para ver como usar a CLI
    `);
}
exports.incorrectUsage = incorrectUsage;
