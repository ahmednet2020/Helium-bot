import * as Discord from 'discord.js'
import { prefix } from './config'

//RichEmbed info in chat comand
export default function RichEmbed(message:Discord.Message, botName, report):any {
	if(message.author.bot) return null;
	if(message.channel.type === 'dm') return null;

	if(message.content === `${prefix}botinfo`)
	{
		let url = message.guild.members.find(bot => bot.user.username === botName).user.displayAvatarURL;
		let botinfo = new Discord.RichEmbed()
			.setDescription('botinfo')
			.setColor('#ff1')
			.setThumbnail(url)
			.setTimestamp()
			.addField('bot name',botName)
			if(!report) return message.channel.send('cant find report server');
			report.send(botinfo);
			return null;
	} else if (message.content.startsWith(`${prefix}info`)){
		let user = message.mentions.members.first();
		if(!user) return null;
		let url = message.guild.members.find(bot => bot.user.username === user.user.username).user.displayAvatarURL;
		let userInfo = new Discord.RichEmbed()
			.setDescription(`${user.user.username} info`)
			.setColor('#ff1')
			.setThumbnail(url)
			.setTimestamp()
			.addField('join at', user.joinedAt);
			if(!report) return message.channel.send('cant find report server');
			report.send(userInfo);
			return null;
	}
}