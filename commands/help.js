const {prefix} = require('../config.json');
module.exports = {
    name: "help",
    description: "Sends this message~",
    usage: "__help [command]",
    execute(message,args){
        data = [ ]
        const {commands} = message.client;
        console.log(message.client)
        if(!args.lenght){
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => {
                return `Name: ${command.name} Usage: ${command.usage}`
            }).join(`\n`));
            
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.channel.send(data, { split: true })
        }
    }
}