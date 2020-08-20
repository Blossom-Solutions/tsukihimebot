const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', ()=>{
    console.log("Ready!");
    console.log(`Ready time: ${client.readyAt}`);
    console.log(`logged in as :${client.user.username}`);
    client.user.setActivity('type __help for info');
    console.log(`Logged into servers: ${client.guilds.cache.array().join(", ")}`)
    console.log(store.getState())
})

client.on('message', message=>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    try{
        command.execute(message,args)
    } catch(err){
        console.error(err);
        message.reply('Sorry, there was an error executing that command!');
    }
    
})


client.login(token);