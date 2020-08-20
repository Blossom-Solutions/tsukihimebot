const { BroadcastDispatcher, VoiceConnection } = require("discord.js");

module.exports = {
    name: "stop",
    description: "stops current song and leaves",
    usage: "__stop",
    execute(message,args){
        const voiceChannel = message.member.voice.channel;
        voiceChannel.leave()
    }
}