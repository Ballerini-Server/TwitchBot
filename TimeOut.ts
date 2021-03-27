import { IrcMessage, Channel } from 'https://deno.land/x/tmi/mod.ts';

interface ITimeOutUser{
    [userName: string] : number
}
const timeOutNumber : ITimeOutUser = {}

export function TimeOut(ircMsg: IrcMessage, channel: Channel){
    if (timeOutNumber[ircMsg.username]){
        timeOutNumber[ircMsg.username]++;
        channel.commands.timeout(ircMsg.username, 600 * timeOutNumber[ircMsg.username])
    } else {
        const newUser = {[ircMsg.username] : 1}
        Object.assign(timeOutNumber, newUser)
        channel.commands.timeout(ircMsg.username, 600)
    }
}