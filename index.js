const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');

app();

function app () {
    const files = getFiles();
    const strings = findStrings(files);
    console.log('Please, write your command!');
    readLine((command) => {
        processCommand(strings, command);
    });
}

function getFiles () {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand (strings, command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(strings);
            break;
        default:
            console.log('wrong command');
            break;
    }
}


// TODO you can do it!
/*function sortByKey (strings) {
    console.log(strings);
}*/

function findStrings(strings) {
    let substrings = [];
    for (let string of strings) {
        let start = string.indexOf('\/\/ TODO');
        while (start >= 0 && start < string.length) {
            let end = string.indexOf('\n', start);
            substrings.push(string.slice(start, end));
            start = string.indexOf('\/\/ TODO', end + 2);
        }
    }
    return substrings;
}