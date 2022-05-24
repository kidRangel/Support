const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js')

module.exports = async (client, i) => {

    let cargostaff = [
        "782413616023470097"
    ]

    if (i.isSelectMenu() && i.customId == 'suporte') {
        if (i.values[0] === 'suporte') {
                if (i.member.guild.id !== process.env.GUILDID) return;
                if (i.message.channel.parent.children.size > 40) return i.reply({ content: `${i.user.toString()}, muitos tickets abertos no momento, tente novamente mais tarde.`, ephemeral: true });
                let channelInUse = i.member.guild.channels.cache.find(c => c.name === `📞・${i.user.id}` && c.type === `GUILD_TEXT`);
                if (channelInUse) return i.reply({ content: `${i.user.toString()}, você já possui um ticket aberto no canal: <#${channelInUse.id}>`, ephemeral: true });
                await i.member.guild.channels.create(`📞・${i.user.id}`, {
                    type: 'GUILD_TEXT',
                    permissionOverwrites: [
                        {
                            id: i.user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: i.member.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL'],
                            allow: ['ATTACH_FILES', 'EMBED_LINKS']
                        },
                    ],
                    parent: '969714636003876954',
                    reason: `[Ticket] ${i.user.tag}`
                }).then(async canal => {
                    for (cargo of cargostaff) {
                        await canal.permissionOverwrites.edit(cargo, { VIEW_CHANNEL: true });
                    }
                    await i.reply({ content: `${i.user.toString()}, seu ticket foi aberto no canal: <#${canal.id}>`, ephemeral: true });

                    let button = new MessageButton()
                        .setStyle('SECONDARY')
                        .setCustomId('call')
                        .setLabel('Criar call')
                        .setEmoji('🔈')
                    let button2 = new MessageButton()
                        .setStyle('SECONDARY')
                        .setCustomId('finalizar')
                        .setLabel('Fechar Ticket')
                        .setEmoji('❌')

                    let embed = new MessageEmbed()
                        .setAuthor({ name: `Sistema de Ticket`, iconURL: i.member.guild.iconURL({ dynamic: true}) })
                        .setTitle(`Suporte - ${i.user.tag}`)
                        .setDescription('Você está em um canal de contato com nossa equipe de suporte.\nDiga-nos quais são suas dúvidas e em breve um staffer irá lhe responder.')
                        .setFooter({ text: `Não feche o ticket enquanto suas dúvidas não forem esclarecidas.` })
                        .setColor(process.env.HEXCOLOREMBED);
                    const row = new MessageActionRow()
                        .addComponents([button, button2])
                    let conteudo = `${i.user.toString()}, ${cargostaff.map(c => `<@&${c}>`)}`
                    await canal.send({ content: conteudo, embeds: [embed], components: [row] })
                })

        }

        if (i.values[0] === 'denuncia') {
            if (i.member.guild.id !== process.env.GUILDID) return;
            if (i.message.channel.parent.children.size > 40) return i.reply({ content: `${i.user.toString()}, muitos tickets abertos no momento, tente novamente mais tarde.`, ephemeral: true })
            let channelInUse = i.member.guild.channels.cache.find(c => c.name === `🚨・${i.user.id}` && c.type === `GUILD_TEXT`);
            if (channelInUse) return i.reply({ content: `${i.user.toString()}, você já tem um ticket aberto no canal: <#${channelInUse.id}>`, ephemeral: true });
            await i.member.guild.channels.create(`🚨・${i.user.id}`, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [
                    {
                        id: i.user.id,
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: i.member.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                        allow: ['ATTACH_FILES', 'EMBED_LINKS']
                    },
                ],
                parent: '969714636003876954',
                reason: `[Denúncia] ${i.user.tag}`
            }).then(async canal => {
                for (cargo of cargostaff) {
                    await canal.permissionOverwrites.edit(cargo, { VIEW_CHANNEL: true });
                }
                await i.reply({ content: `${i.user.toString()}, sua denúncia foi aberta no canal: <#${canal.id}>`, ephemeral: true })
                let button = new MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId('call2')
                    .setLabel('Criar call')
                    .setEmoji('🔈')
                let button2 = new MessageButton()
                    .setStyle('SECONDARY')
                    .setCustomId('finalizar')
                    .setLabel('Fechar Ticket')
                    .setEmoji('❌')

                let embed = new MessageEmbed()
                    .setAuthor({ name: `Sistema de Ticket`, iconURL: i.member.guild.iconURL({ dynamic: true}) })
                    .setTitle(`Suporte - ${i.user.tag}`)
                    .setDescription('Você está em um canal de contato com nossa equipe de suporte.\nExplique sua denúncia e apresente as provas. Em breve um staffer irá lhe responder.')
                    .setFooter({ text: `Não feche o ticket enquanto sua denúncia não for resolvida.` })
                    .setColor(process.env.HEXCOLOREMBED);
                
                const row = new MessageActionRow()
                    .addComponents([button, button2])
                let conteudo = `${i.user.toString()}, ${cargostaff.map(c => `<@&${c}>`)}`
                await canal.send({ content: conteudo, embeds: [embed], components: [row] })
            })
        }
    }

    if (i.isButton()) {
        if (i.customId == 'call') {
            let channelInUse = i.member.guild.channels.cache.find(c => c.name === `📞・${i.message.content.slice(i.message.content.indexOf("@") + 1, i.message.content.indexOf(">"))}` && c.type == 'GUILD_VOICE');
            if (channelInUse) return i.deferUpdate()
            let canal = await i.member.guild.channels.create(`📞・${i.message.content.slice(i.message.content.indexOf("@") + 1, i.message.content.indexOf(">"))}`, {
                type: 'GUILD_VOICE',
                permissionOverwrites: [
                    {
                        id: i.message.content.slice(i.message.content.indexOf("@") + 1, i.message.content.indexOf(">")),
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: i.member.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                ],
                parent: `${i.message.channel.parent.id}`,
                reason: `[CallSuporte] ${i.user.tag}`
            }).then(async call => {
                for (cargo of cargostaff) {
                    await call.permissionOverwrites.edit(cargo, { VIEW_CHANNEL: true });
                }
                i.reply({ content: `${i.user.toString()}, o canal de voz foi criado. Clique em ${call.toString()} para conectar.` })
            })
        }
        if (i.customId == 'call2') {
            let channelInUse = i.member.guild.channels.cache.find(c => c.name === `🚨・${i.message.content.slice(i.message.content.indexOf("@") + 1, i.message.content.indexOf(">"))}` && c.type == 'GUILD_VOICE');
            if (channelInUse) return i.deferUpdate()
            let canal = await i.member.guild.channels.create(`🚨・${i.message.content.slice(i.message.content.indexOf("@") + 1, i.message.content.indexOf(">"))}`, {
                type: 'GUILD_VOICE',
                permissionOverwrites: [
                    {
                        id: i.message.content.slice(i.message.content.indexOf("@") + 1, i.message.content.indexOf(">")),
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: i.member.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    }
                ],
                parent: `${i.message.channel.parent.id}`,
                reason: `[CallSuporte] ${i.user.tag}`
            }).then(async call => {
                for (cargo of cargostaff) {
                    await call.permissionOverwrites.edit(cargo, { VIEW_CHANNEL: true });
                    await i.reply({ content: `${i.user.toString()}, o canal de voz foi criado. Clique em ${call.toString()} para conectar.` })
                }
            })

        }
        if (i.customId == 'finalizar') {
            i.reply('Seu canal será fechado em 10 segundos.')
            setTimeout(() => {
                i.message.channel?.parent.children.filter(c => c.name == i.message.channel.name).map(c2 => c2.delete([`Canal fechado por ${i.user.tag} (${i.user.id})`]))
            }, 10000);
        }
    }
}