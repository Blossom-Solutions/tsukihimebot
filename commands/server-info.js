module.exports = {
    name: 'server-info',
    description: 'Retrieves server info',
    usage: '__server',
    execute(message,args){
        message.react('❤️');
        message.channel.send(`This server's name is: ${message.guild.name}\n`+
        `It has currently ${message.guild.memberCount} members!\n`+
        `And it's located on ${message.guild.region}\n`+
        `Anything else ${message.author}?`)
    }
}