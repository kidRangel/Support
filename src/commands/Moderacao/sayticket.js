const { MessageEmbed, Permissions, MessageSelectMenu, MessageActionRow } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('suporte')
                .setPlaceholder('Nada Selecionado')
                .setMaxValues(1)
                .addOptions([
                    {
                        label: 'Suporte',
                        description: 'Selecione esta opção para obter suporte',
                        value: 'suporte',
                        emoji: '📞'
                    },
                    {
                        label: 'Denúncias',
                        description: 'Selecione esta opção para denunciar um usuário',
                        value: 'denuncia',
                        emoji: '❗'
                    }
                ]),
        );

    let embed = new MessageEmbed()
        .setAuthor({ name: `Sistema de Suporte`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`Precisa de ajuda com algo no servidor?\nVocê pode abrir um ticket e conversar com nossa equipe.`)
        .addField('<:pin:969693315136098395> COMO UTILIZAR OS TICKETS:', `Os tickets podem ser utilizados para:\n・Esclarecer dúvidas em relação ao servidor;\n・Denunciar membros do servidor;\n・Denunciar membros da equipe.`)
        .addField('<:arrow:969713241955663912> SELECIONE UMA OPÇÃO:', `📞 Para obter suporte e esclarecer dúvidas;\n❗ Para denunciar membros do servidor.`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor(process.env.HEXCOLOREMBED);

    message.channel.send({ embeds: [embed], components: [row] });
}

module.exports.help = {
    username: "sayticket"
}