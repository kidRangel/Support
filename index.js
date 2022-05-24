const {Client, Collection}= require('discord.js')
const client = new Client({ intents: 32767, partials: ['CHANNEL'] });
require('dotenv').config()

const {TOKEN}   = process.env
const Command   = require('./src/utils/handler/commands')
const Event     = require('./src/utils/handler/events')
client.usuarios = new Collection()
client.commands = new Collection()

Command(client)
Event(client)

client.login(TOKEN)