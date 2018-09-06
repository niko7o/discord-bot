require('dotenv').load();

const { Client, Attachment } = require('discord.js');
const client = new Client();
const token = process.env.DISCORD_BOT_SECRET;
const ytdl = require('ytdl-core')

// We want each server to have its own queue, otherwise each discord voice channel would share one only queue
var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], { 
        filter: 'audioonly',
        quality: 'highestaudio'
    }));
    server.queue.shift();
    server.dispatcher.on('end', () => {
        server.queue[0] ? play(connection, message) : connection.disconnect();
    })
}

client.on('ready', () => {
    console.log(`${client.user.username} has initialized and is ready.`);
});

client.on('message', message => {
    let args = message.content.split(' ');

    switch(args[0].toLowerCase()) {
        case 'info':
                    message.channel.send('Geisha is a node.js powered bot developed by Nikoto')
                    message.channel.send('Feel free to visit his github @ https://github.com/nikotomad')
                    break;

        case '!geisha':
                    const geishaGIF = new Attachment('https://i.kinja-img.com/gawker-media/image/upload/t_original/nxriqrwngk6j2ucts2ev.gif');
                    message.channel.send(geishaGIF)
                    break;
            
        case '!play':
                    if(!args[1]) {
                        message.channel.send('Please provide a link for the youtube video you want to listen to..');
                        return;
                    }

                    if(!message.member.voiceChannel) {
                        message.channel.send('You must be in a voice channel.');
                        return;
                    }

                    if(!servers[message.guild.id]) {
                        servers[message.guild.id] = { queue: [] };
                    }

                    var server = servers[message.guild.id];

                    if (args[1].includes('youtube.com/watch?v=')) {
                        server.queue.push(args[1])
                        if (!message.guild.voiceConnection) {
                            message.member.voiceChannel.join()
                                .then(connection => {
                                    play(connection, message);
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    } else {
                        message.channel.send(`Sorry, I just can't process that link. Make sure it's from youtube!`);
                    }

                    break;
                
        case '!next':
                    var server = servers[message.guild.id];
                    if(server.dispatcher) server.dispatcher.end();
                    break;

        case '!stop':
                    var server = servers[message.guild.id];
                    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                    break;
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`The geisha robots welcome you, ${member}`);
});

client.login(token);