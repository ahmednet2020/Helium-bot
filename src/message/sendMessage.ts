import * as Discord from 'discord.js'

const hiWorlds = ['hi', 'hello', 'welcome'];

export default function sendMessage(message:Discord.Message, bot) {
	if(message.channel.type === 'dm') {
		message.channel.send('what');
	} else if (message.channel.type === 'text') {
		if(hiWorlds.indexOf(message.content.split(" ")[0]) !== -1)
		{
			if(message.mentions.users.find((user) => user.username === bot.user.username))
			{
				message.member.send('welcome:D');
			} else if (message.mentions.everyone) { 
				message.channel.send('welcome all')
			} else {
				message.channel.send(`${message.content} <@${message.member.id}>`)
			}
		}
	}
	
}