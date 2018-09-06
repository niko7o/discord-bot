require('dotenv').load();
const { Client, Attachment } = require('discord.js');
const client = new Client();
const token = process.env.DISCORD_BOT_SECRET;

client.on('ready', () => {
    console.log(`Bot ${client.user.username} has initialized and is ready.`);
});

client.on('message', msg => {
    switch(msg.content) {
        case '!geisha':
                    const geishaGIF = new Attachment('https://i.kinja-img.com/gawker-media/image/upload/t_original/nxriqrwngk6j2ucts2ev.gif');
                    msg.channel.send(geishaGIF)
                    break;

        case 'ping': 
                    msg.reply('Pong!');
                    break;
                    
        case 'opening hours':
                    msg.reply('Monday to Friday: 09:00H to 18:00H');
                    msg.reply('Calle Castelló, 19, Local izquierdo');
                    break;

        case 'becurious':
                    msg.reply('Becurious gallery: Legends, by Manu Campa:');
                    msg.reply('Starts on Thursday, September 27th');
                    msg.reply('Ends on Friday, October 26th');
    }

    console.log(msg)
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`The geisha robots welcome you, ${member}`);
});

client.login(token);