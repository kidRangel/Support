const { readdir } = require('file-system')
const chalk = require('chalk')
module.exports = async (client) => {
    readdir("./src/events/", (err, files) => {
        if (err) throw new Error('Events Loader Error: ' + err)
        files.forEach(category => {
            readdir(`./src/events/${category}`, (err, ev) => {
                ev.forEach(file => {
                    const event = require(`../../events/${category}/${file}`);
                    if(!event) return console.error(chalk.red.bold(' | [ Events ]  Error' ))
                    let eventName = file.split(".")[0];
                    console.log('| ' + chalk.rgb(80, 80, 80).bold('[ EVENTOS ] ') + eventName.toUpperCase() + ' ✔️')
                    client.on(eventName, event.bind(null, client));
                });
            })
        });
    });
}