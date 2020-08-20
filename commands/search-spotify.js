const spotify =require('../spotify.js');

module.exports = {
    name: "search-spotify",
    description: "You can search anything in here~",
    usage: "__search-spotify + song/artist",
    execute(message,args){
        if(!args.length){
            return message.channel.send("You didn't put anything for me to search!");
        }
        message.react('❤️');
        spotify.clientCredentialsGrant()
        .then(data =>{
            args = args.join(' ')
            spotify.setAccessToken(data.body['access_token']);
            return spotify.searchTracks(args)
        }).then(data =>{
            message.channel.send(`I got ${data.body.tracks.total} results!`);
            message.channel.send(`Top results found of ${args}:`);
            for(let i = 0; i<3 ; i++){
                message.channel.send(` ${i+1}: ${data.body.tracks.items[i].external_urls['spotify']}`)
            }
        })
    }
}



