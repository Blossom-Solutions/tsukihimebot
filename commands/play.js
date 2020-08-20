const ytdl = require('ytdl-core');
const  {google} = require('googleapis');
const {ytToken} = require('../config.json');

module.exports = {
    name: "play",
    description: "play a youtube video~",
    usage: "__play [ytlink] or [anything]",
    execute(message,args){
        if(!args.length) return message.channel.send(`you didn't put anything to search!`);
        if(args.join("").includes("youtube.com")){
            const voiceChannel = message.member.voice.channel;
            if(!voiceChannel) return message.channel.send('You must be in a channel first!')
            const aVid = args.join("");
            message.channel.send(`now playing > ${aVid}`);
            voiceChannel.join().then( connection =>{
                const aStream = ytdl(`${aVid}`, {filter: 'audioonly'});
                const aDispatcher = connection.play(aStream,{volume: 0.3});
                aDispatcher.on('finish', () => voiceChannel.leave());
                return 
            })

        }else{
            google.youtube('v3').search.list({
                key: ytToken,
                part: 'snippet',
                q: args.join(' '),
                type: 'video',
                maxResults: 1,
            }).then(
                response =>{
                    const vidId = response.data.items[0].id['videoId'];
                    const voiceChannel = message.member.voice.channel;
                    if(!voiceChannel) return message.channel.send('You must be in a channel first!')
                    message.channel.send(`now playing > https://www.youtube.com/watch?v=${vidId}`)
                    voiceChannel.join().then( connection =>{
                        const stream = ytdl(`https://www.youtube.com/watch?v=${vidId}`,{filter: 'audioonly'});
                    const dispatcher = connection.play(stream,{volume: 0.3})
                        dispatcher.on('finish', () => voiceChannel.leave());
                    }

                    )
                }
            )
        }
    }
}