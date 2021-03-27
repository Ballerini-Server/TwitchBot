import { TwitchChat} from 'https://deno.land/x/tmi/mod.ts';
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { comandos } from './Commands.ts';
import { ProhibitedWords } from './ProhibitedWords.ts';
import { TimeOut } from './TimeOut.ts';

//Valores criados em um .env
const{twitchtoken, twitchchannel, twitchbot} = config();
const tc = new TwitchChat(twitchtoken, twitchbot);

try {

    await tc.connect();
    
    const channel = tc.joinChannel(twitchchannel);
    
    channel.addEventListener('privmsg', (ircMsg) => {
        if (Object.getOwnPropertyNames(comandos).includes(ircMsg.message)) {
            channel.send(comandos[ircMsg.message]);
        }
        if (ProhibitedWords.find(word => {
            return !!ircMsg.message.includes(word)
        })){
            TimeOut(ircMsg, channel)
        }
    
    });
    console.log('funcionando');

} catch (err) {

    console.error(err)
    tc.disconnect();

}

//comando para execução: deno run --allow-net --allow-read ./Index.ts