const yargs = require('yargs');

const argv = yargs
    .command('ojmd-cnp', 'Erstelle neues Projekt.', {
        name: {
            description: 'Verzeichnis Name',
            alias: 'n',
            type: 'string',
        }
    })
    .option('js', {
        alias: 'js',
        description: 'Include Javascript',
        type: 'boolean',
    })
    .option('path', {
        alias: 'p',
        description: 'Zielpath',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv._.includes('ojmd-cnp')) {
    let js = false;
    let path = "";

    var project_name = argv.name || null;

    if (project_name) {
        console.log(`Erstelle Ordner mit Name: ${project_name} `);

        if (argv.js) {
            js = true
            console.log('Erstelle Ordnerstruktur mit Javascript!');
        }
        if (argv.path) {
            console.log(`Ziel Path: ${argv.path}`);
        }

        CopyFiles(project_name)

    } else {
        console.log("Bitte Projektname \"-n\" angeben!")
    }
} else {
    console.log(`Befehlt nicht erkannt`);
}

function CopyFiles(target) {

    const fs = require('fs');
    const fse = require("fs-extra");

    let quelle = "standard"
    //let target = "node-test-app"

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    } else {
        console.log("Verzeichnis existiert!!!")
    }

    try {
        fse.copySync(`./example/${quelle}`, `./${target}`);
        console.log(`Projektverzeichnis ${target} wurde erstellt!`);
    } catch (err) {
        console.log(err);
    }
}