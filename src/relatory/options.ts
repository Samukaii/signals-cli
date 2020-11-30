const allowedOptions = {
    '--mostrar-apenas': '',
    '--gales': '',
    '-g': '',
    '-m': '',
}

const optionsConverter = {
    '--mostrar-apenas': 'show',
    '--gales': 'gales',
    '-g': 'gales',
    '-m': 'show',
}
const valueConverter = {
    'loss': 'loss',
    'lss': 'loss',
    'los': 'loss',
    'ls': 'loss',
    'l': 'loss',
    'wins': 'wins',
    'win': 'wins',
    'w': 'wins',
    'wn': 'wins',
    'wns': 'wins',
}



export function getOptions(initialParam = 2){
    let options={};

    process.argv.reduce((argIndex) => {
        let arg = process.argv[argIndex];
        let nextArg = process.argv[argIndex+1];
        if(!arg)return;

        if(arg.match(/--\w*\W*/)){
            let [key, value] = arg.split('=');

            if(allowedOptions.hasOwnProperty(key)){
                const convertedKey = optionsConverter[key]
                options[convertedKey] = (typeof value=='string')?valueConverter[value.toLowerCase()]:value.toLowerCase();
            }
            return argIndex+=1;
        }
        else if(arg.match(/-\w/)){
            if(allowedOptions.hasOwnProperty(arg)){
                const convertedKey = optionsConverter[arg]
                if(nextArg==0){
                    options[convertedKey] = nextArg.toLowerCase();
                    return;
                }
                options[convertedKey] =  (!parseInt(nextArg))?valueConverter[nextArg.toLowerCase()]:nextArg.toLowerCase()
            }
            return argIndex+=2
        }
    }, initialParam)
    return options;
}
