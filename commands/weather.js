const {weatherKey} = require('../config.json');
const toCelc = (k)=>{
    return (k-273.15).toString().slice(0,4)
}
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const fetch = require('node-fetch');

module.exports = {
    name: "weather",
    description: "Sends weather info of the search",
    usage: "__weather + [city name]",
    execute(message,args){
        const query = args.join(" ");
        const endpoint = url+query+'&appid='+weatherKey;
        try{fetch(endpoint)
        .then(data =>{
            const res = data.json();
            return res
        }).then( res =>{
            message.channel.send(`It's currently ${toCelc(res.main.temp)}°C in ${query}!`)
            if(toCelc(res.main.temp)>25){
                message.channel.send("It's quite hot today 🌞")
            }else if(toCelc(res.main.temp)<13){
                message.channel.send("I'm freezing brr ❄️")
            }
        })} catch(err){
            
        }
    }
}
