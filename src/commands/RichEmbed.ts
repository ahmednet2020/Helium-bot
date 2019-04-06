import * as Discord from 'discord.js'

//RichEmbed info in chat comand
export function run(message:Discord.Message, bot, cmd):any {
	if(message.channel.type === 'dm') return null;
	let user = message.mentions.members.first();
	if(!user) return null;
	let url = message.guild.members.find(users => users.user.username === user.user.username).user.displayAvatarURL;
	let userInfo = new Discord.RichEmbed()
		.setDescription(`${user.user.username} info`)
		.setColor('#f44336')
		.setThumbnail(url)
		.setTimestamp()
		.addField('name', user.displayName)
		.addField('join at', user.joinedAt)
		.addField('this info by ',`<@${message.member.id}>`)
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		let report:any = message.guild.channels.find(channel => channel.name === "report");
		if(!report) return message.channel.send('cant find report server');
		report.send(userInfo);
		return null;
}

export const help = {name:"info"}