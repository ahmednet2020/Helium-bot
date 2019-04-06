import * as Discord from 'discord.js'


export function run (message:Discord.Message, bot, cmd):any {
	if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return null;
	let member = message.mentions.members.first()
	if(member) {
		member.kick().then(():any =>{
			//message.reply(`has ben kick <@${member.id}>`)
			let report:any = message.guild.channels.find(channel => channel.name === "report");
			if(!report) return message.channel.send('cant find report server');
			report.send(`<@${member.id}> has ben kick by <@${message.author.id}>`);
		}).catch((err) => console.log(err))
	} else {
		message.reply('mentions member you need to kick')
	}
}

export const help = {name:"kick"}