"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usage = exports.config = exports.last = exports.executed = exports.remaining = exports.relatory = exports.formatSignals = exports.countSignal = exports.previous = exports.nextSignal = void 0;
const chalk_1 = __importDefault(require("chalk"));
const signal_utilities_1 = require("../signal-utilities");
const signalsInfo_1 = require("../signalsInfo");
const helpers_1 = require("../helpers");
const scriptconfig_json_1 = __importDefault(require("../config/scriptconfig.json"));
const relatory_1 = require("../relatory");
const error = __importStar(require("../error"));
const help_1 = require("./help");
const readline_1 = __importDefault(require("readline"));
const auto_trade_1 = require("../coverter/auto-trade");
const helpers_2 = require("../helpers");
function nextSignal() {
    return __awaiter(this, void 0, void 0, function* () {
        let signalsInfo = yield signalsInfo_1.getSignals();
        let nextSignal = signal_utilities_1.getNextSignal(signalsInfo);
        console.log(`O próximo sinal será às ${chalk_1.default.cyan(nextSignal)}`);
    });
}
exports.nextSignal = nextSignal;
function previous() {
    return __awaiter(this, void 0, void 0, function* () {
        let signalsInfo = yield signalsInfo_1.getSignals();
        console.log(`O ÚLTIMO SINAL EXECUTADO FOI ÀS ${chalk_1.default.cyan(signal_utilities_1.getPreviousSignal(signalsInfo))}`);
    });
}
exports.previous = previous;
function countSignal() {
    return __awaiter(this, void 0, void 0, function* () {
        let signalsInfo = yield signalsInfo_1.getSignals();
        if (!signalsInfo)
            return;
        console.log(`ATUALMENTE FORAM CATALOGADOS ${chalk_1.default.bold(signalsInfo.length)} SINAIS`);
    });
}
exports.countSignal = countSignal;
function formatSignals() {
    return __awaiter(this, void 0, void 0, function* () {
        const signalsInfo = yield signalsInfo_1.getSignals();
        auto_trade_1.format(signalsInfo);
    });
}
exports.formatSignals = formatSignals;
function relatory() {
    return __awaiter(this, void 0, void 0, function* () {
        const subArgs = {
            date: process.argv[3]
        };
        if (!subArgs.date) {
            error.noDateProvided();
            return;
        }
        if (!helpers_1.checkDateFormat(helpers_1.convertAliasDate(subArgs.date))) {
            console.log(helpers_1.convertAliasDate(subArgs.date));
            error.invalidDateFormat();
            return;
        }
        relatory_1.relate(helpers_1.convertAliasDate(subArgs.date));
    });
}
exports.relatory = relatory;
function remaining() {
    return __awaiter(this, void 0, void 0, function* () {
        let signalsInfo = yield signalsInfo_1.getSignals();
        console.log(`AINDA FALTAM ${chalk_1.default.cyan(signal_utilities_1.getRemainingSignal(signalsInfo))} SINAIS PARA SEREM EXECUTADOS`);
    });
}
exports.remaining = remaining;
function executed() {
    return __awaiter(this, void 0, void 0, function* () {
        let signalsInfo = yield signalsInfo_1.getSignals();
        console.log(`${chalk_1.default.cyan(signal_utilities_1.getExecutedSignal(signalsInfo))} SINAIS FORAM EXECUTADOS`);
    });
}
exports.executed = executed;
function last() {
    return __awaiter(this, void 0, void 0, function* () {
        let signalsInfo = yield signalsInfo_1.getSignals();
        console.log(`ÀS ${chalk_1.default.cyan(signal_utilities_1.getLastSignal(signalsInfo))} SERÁ EXECUTADO O ÚLTIMO SINAL DE HOJE`);
    });
}
exports.last = last;
function config() {
    let rl = readline_1.default.createInterface(process.stdin, process.stdout);
    console.log(`
                                ${chalk_1.default.bold('CONFIGURAÇÔES')}
        Este é o centro de configurações da CLI e atualmente essas são as configurações
        ${chalk_1.default.greenBright('Time Frame')}: ${scriptconfig_json_1.default.time_frame}
        ${chalk_1.default.greenBright('Data')}: ${scriptconfig_json_1.default.date}
        ${chalk_1.default.greenBright('Entrada Inicial')}: ${scriptconfig_json_1.default.initial_entry}
        ${chalk_1.default.greenBright('Fator do Gale')}: ${scriptconfig_json_1.default.gale_factor}
        
        Digite ${chalk_1.default.yellowBright('CTRL+C')} a qualquer momento para cancelar

        Caso queira pular uma pergunta apenas tecle ${chalk_1.default.yellowBright('ENTER')}
    `);
    questTimeFrame();
    function questTimeFrame() {
        rl.question(`        
        Digite o timeframe que você deseja configurar ${chalk_1.default.yellowBright('(formato 1, 5, 15...)')}
        `, (timeframe) => {
            if (timeframe != "") {
                if (helpers_2.isNumber(timeframe))
                    scriptconfig_json_1.default.time_frame = parseFloat(timeframe.trim());
            }
            questDate();
        });
    }
    function questDate() {
        rl.question(`        
        Digite a data dos sinais ${chalk_1.default.yellowBright('(formato DD:MM:AAAA')}
        ${chalk_1.default.greenBright('DICA:')} você também pode digitar 'hoje' ou 'ontem' 
        ao invés de digitar a data completa 
        `, (date) => {
            if (date) {
                if (helpers_1.checkDateFormat(helpers_1.convertAliasDate(date))) {
                    scriptconfig_json_1.default.date = helpers_1.convertAliasDate(date);
                }
                else {
                    console.log(chalk_1.default.redBright(`
        ✘ Formato Incorreto de data
                `));
                    questDate();
                }
            }
            questInitialEntry();
        });
    }
    function questInitialEntry() {
        rl.question(`        
        Digite o valor de entrada inicial dos sinais ${chalk_1.default.yellowBright('(formato 3, 5, 10...)')}
        `, (initialEntry) => {
            if (initialEntry) {
                if (helpers_2.isNumber(initialEntry))
                    scriptconfig_json_1.default.initial_entry = parseFloat(initialEntry);
                else {
                    console.log(chalk_1.default.redBright(`
        ✘ Formato Incorreto de entrada
                `));
                    questInitialEntry();
                }
            }
            questGaleFactor();
        });
    }
    function questGaleFactor() {
        rl.question(`        
        Digite o fator dos gales ${chalk_1.default.yellowBright('(formato 2.3, 2.5, 3...)')}
        ${chalk_1.default.redBright.bold("ATENÇÃO:")} Utilize o ponto quando o número for decimal
        e não a vírgula

        ${chalk_1.default.redBright.bold("✘ Errado: 2,3")}
        ${chalk_1.default.greenBright("✓ Certo: 2.3")}

        `, (galeFactor) => {
            if (galeFactor) {
                if (helpers_2.isNumber(galeFactor))
                    scriptconfig_json_1.default.gale_factor = parseFloat(galeFactor);
                else {
                    console.log(chalk_1.default.redBright(`
        ✘ Formato Incorreto de fator
                `));
                    questGaleFactor();
                }
            }
            helpers_1.saveConfig(scriptconfig_json_1.default);
            rl.close();
        });
    }
}
exports.config = config;
function usage() {
    const subArgs = {
        subcommand: process.argv[3]
    };
    if (!help_1.helpTexts[subArgs.subcommand] || !subArgs.subcommand) {
        console.log(help_1.helpTexts.help);
        return;
    }
    console.log(help_1.helpTexts[subArgs.subcommand]);
}
exports.usage = usage;
