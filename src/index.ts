import * as Discord from 'discord.js'
import { token } from './config'

const client = new Discord.Client();
let botName;
const hiWorlds = ['hi', 'hello', 'welcome'];
client.once( 'ready' , ()=> {
	console.log('bot is ready')
	botName = client.user.username;
})

client.on('message', (message) => {
	if(message.member.displayName !== botName)
	{
		if(hiWorlds.indexOf(message.content) !== -1)
		{
			message.channel.send(`${message.content} ${message.member.displayName}`)
		}
		if(message.mentions.users.find('username', botName))
		{
			message.channel.send('why me')
		} else if (message.mentions.everyone) { 
			message.channel.send('welcome all')
		} else {
			message.channel.send('iam here')
		}
	}
})
client.login(token);