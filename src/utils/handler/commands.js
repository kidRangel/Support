const { readdir } = require('file-system')
const chalk = require('chalk')
module.exports = async (client) => {
    readdir("./src/commands", (err, f) => {
        if(err) throw new RangeError("Command Loader Error: " + err)
        f.forEach(category => {
            readdir(`./src/commands/${category}`, (err, cmd) => {
                cmd.forEach(cmd => {
                    if(err) return console.error(chalk.red.bold(' | [ COMMANDS ]  ' + err))
                    const Command = require(`../../commands/${category}/${cmd}`)
                    delete require.cache[require.resolve(`../../commands/${category}/${cmd}`)]
                
                    client.commands.set(Command.help.username, Command)
                    
                    console.log('| ' + chalk.rgb(80, 80, 80).bold('[ COMANDO ] ') + cmd.replace('.js', '').replace('Comando', '').toUpperCase() + ' ✔️')
                })
            })
        })
    })
}