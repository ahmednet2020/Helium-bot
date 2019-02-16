import * as Discord from 'discord.js'

const hiWorlds = ['hi', 'hello', 'welcome'];

export default function sendMessage(message:Discord.Message, botName) {
	if(message.author.bot) return null;
	if(message.channel.type === 'dm') {
		message.channel.send('what');
	} else if (message.channel.type === 'text')
	{
		if(hiWorlds.indexOf(message.content) !== -1)
		{
			message.channel.send(`${message.content} ${message.member.displayName}`)
		}
		if(message.mentions.users.find((user) => user.username === botName))
		{
			message.member.send('welcome:D');
		} else if (message.mentions.everyone) { 
			message.channel.send('welcome all')
		}
	}
	
}