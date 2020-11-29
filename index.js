import {operations} from './commands/operations.js';
import {incorrectUsage} from './error.js';

let args = {
    operation: process.argv[2]
}

function execute(){
    if(!args.operation){
        operations.help();
        return;
    }
    if(!operations[args.operation]){
        incorrectUsage(); 
        return;
    }
    operations[args.operation]();
}


execute();



